import { FC, useState } from "react";
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
  const [project, setProject] = useState<IProject>({
    name: "test",
    storeys: [{ name: "level 1", level: 0 }],
  });

  const projectService: IProjectService = {
    current: () => project,
    access<T>(accessor: Accessor<T>): T {
      return accessor(project);
    },
    setName: (newName: string) => {
      setProject({ ...project, name: newName });
    },
    set: (reducer: Reducer) => setProject(reducer),
  };

  return (
    <ProjectServiceContext.Provider value={projectService}>
      {children}
    </ProjectServiceContext.Provider>
  );
};
