import { FC, useState } from "react";
import { generateUUID } from "three/src/math/MathUtils";
import Contextualizer from "../../Contextualizer";
import ProvidedServices from "../../ProvidedServices";
import IProject from "../models/project.model";

export type Reducer = (state: IProject) => IProject;
export type Accessor<T> = (state: IProject) => T;

export interface IProjectService {
  current: () => IProject;
  access<T>(accessor: Accessor<T>): T;
  set(reducer: Reducer): void;
  setName(newName: string): void;
}

const ProjectServiceContext = Contextualizer.createContext(
  ProvidedServices.ProjectService
);

export const ProjectService: FC<any> = ({ children }) => {
  const guid = generateUUID();
  const [project, setProject] = useState<IProject>({
    name: "test",
    elements: { [guid]: { guid: guid, name: "Level 0", level: 0 } },
    storeys: [guid],
    storeyConstraints: {},
  } as IProject);

  const projectService: IProjectService = {
    current: () => project,
    access<T>(accessor: Accessor<T>): T {
      return accessor(project);
    },
    setName: (newName: string) => {
      setProject({ ...project, name: newName });
    },
    set: (reducer: Reducer) => setProject(reducer(project)),
  };

  return (
    <ProjectServiceContext.Provider value={projectService}>
      {children}
    </ProjectServiceContext.Provider>
  );
};
