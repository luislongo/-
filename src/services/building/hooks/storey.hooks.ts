import Contextualizer from "../../Contextualizer";
import ProvidedServices from "../../ProvidedServices";
import { IStoreyService } from "../services/storey.service";
import { useProjectService } from "./project.hooks";

export const useStoreyService = () => {
  return Contextualizer.use<IStoreyService>(ProvidedServices.StoreyService);
};

export const useStoreys = () => {
  return useProjectService().access((project) => project.storeys);
};
