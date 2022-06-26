import Contextualizer from "../../Contextualizer";
import ProvidedServices from "../../ProvidedServices";
import { IProjectService } from "../services/project.service";

export const useProjectService = () => {
  return Contextualizer.use<IProjectService>(ProvidedServices.ProjectService);
};

export const useProject = () => {
  return useProjectService().current();
};
