import { FC } from "react";
import Contextualizer from "../../Contextualizer";
import ProvidedServices from "../../ProvidedServices";
import { useProjectService } from "../hooks/project.hooks";
import Project, { StoreyConstraint } from "../models/project.model";
import Storey from "../models/storey.model";
const _ = require("lodash");

export interface IStoreyService {
  current(): { [guid: string]: Storey };
  access<T>(accessor: (state: { [guid: string]: Storey }) => T): T;
  addStorey(newStorey: Storey, constraint: StoreyConstraint): void;
  removeStorey(storeyGuid: string): void;
  updateStoreyLevel(storeyGuid: string, newLevel: number): void;
  recalculateStoreyLevels(state: Project, storeyGuid: string): Project;
  nrOfStories(): number;
}

const StoreyServiceContext = Contextualizer.createContext(
  ProvidedServices.StoreyService
);

export const StoreyService: FC<any> = ({ children }) => {
  const projectService = useProjectService();

  const storeyService: IStoreyService = {
    current: () =>
      projectService.access((project) =>
        _.pick(project.elements, ...project.storeys)
      ),
    access<T>(accessor: (state: { [guid: string]: Storey }) => T): T {
      return accessor(storeyService.current());
    },
    addStorey: (newStorey: Storey, constraint: StoreyConstraint) => {
      projectService.set((state) => {
        const newState = {
          ...state,
          storeys: [...state.storeys, newStorey.guid],
          elements: { ...state.elements, [newStorey.guid]: newStorey },
          storeyConstraints: {
            ...state.storeyConstraints,
            [newStorey.guid]: constraint,
          },
        };

        return storeyService.recalculateStoreyLevels(newState, newStorey.guid);
      });
    },
    removeStorey: (storeyGuid: string) => {
      projectService.set((state) => {
        const depGuids = Object.entries(state.storeyConstraints)
          .filter(([guid, constraint]) => constraint.refGuid === storeyGuid)
          .map(([guid, constraint]) => guid);

        const refGuid = state.storeyConstraints[storeyGuid]?.refGuid || "";
        const newConstraints = _.pick(state.storeyConstraints, ...depGuids);

        for (let depGuid of depGuids) {
          newConstraints[depGuid].refGuid = refGuid;
        }

        const newState = {
          ...state,
          storeys: state.storeys.filter((guid) => guid !== storeyGuid),
          elements: {
            ...state.elements,
            [storeyGuid]: undefined,
          },
          storeyConstraints: {
            ...state.storeyConstraints,
            ...newConstraints,
          },
        };

        delete newState.storeyConstraints[storeyGuid];
        delete newState.elements[storeyGuid];

        return newState;
      });
    },
    updateStoreyLevel: (storeyGuid: string, newLevel: number) => {
      projectService.set((state) => {
        if (state.storeyConstraints[storeyGuid]) {
          state.storeyConstraints[storeyGuid].offset = newLevel;
        }

        const newState = {
          ...state,
          elements: {
            ...state.elements,
            [storeyGuid]: {
              ...state.elements[storeyGuid],
              level: newLevel,
            },
          },
        };

        return storeyService.recalculateStoreyLevels(newState, storeyGuid);
      });
    },

    recalculateStoreyLevels: (state: Project, storeyGuid: string) => {
      const constraint = state.storeyConstraints[storeyGuid];

      if (constraint) {
        const refGuid = constraint.refGuid;
        const newLevel =
          constraint.offset +
          storeyService.access((state) => state[refGuid].level);

        state = {
          ...state,
          elements: {
            ...state.elements,
            [storeyGuid]: { ...state.elements[storeyGuid], level: newLevel },
          },
        };

        const depGuids = Object.entries(state.storeyConstraints)
          .filter(([guid, constraint]) => constraint.refGuid === storeyGuid)
          .map(([guid, constraint]) => guid);

        depGuids.forEach(
          (guid) => (state = storeyService.recalculateStoreyLevels(state, guid))
        );
      }

      return state;
    },
    nrOfStories: () =>
      storeyService.access((state) => Object.keys(state).length),
  };

  return (
    <StoreyServiceContext.Provider value={storeyService}>
      {children}
    </StoreyServiceContext.Provider>
  );
};
