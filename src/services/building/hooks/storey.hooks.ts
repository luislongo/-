import Contextualizer from "../../Contextualizer";
import ProvidedServices from "../../ProvidedServices";
import { IStoreyService } from "../services/storey.service";

export const useStoreyService = () => {
  return Contextualizer.use<IStoreyService>(ProvidedServices.StoreyService);
};

export const useStoreys = () => {
  return useStoreyService().current();
};
