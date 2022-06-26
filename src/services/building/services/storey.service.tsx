import { FC } from "react";
import Contextualizer from "../../Contextualizer";
import ProvidedServices from "../../ProvidedServices";
import { useProjectService } from "../hooks/project.hooks";
import Storey from "../models/storey.model";

export interface IStoreyService {
  current(): Storey[];
  addStorey(newStorey: Storey): void;
}

const StoreyServiceContext = Contextualizer.createContext(
  ProvidedServices.StoreyService
);

export const StoreyService: FC<any> = ({ children }) => {
  const projectService = useProjectService();

  const storeyService: IStoreyService = {
    current: () => projectService.access((project) => project.storeys),
    addStorey: (newStorey: Storey) =>
      projectService.set((state) => ({
        ...state,
        storeys: [...state.storeys, newStorey],
      })),
  };

  return (
    <StoreyServiceContext.Provider value={storeyService}>
      {children}
    </StoreyServiceContext.Provider>
  );
};
