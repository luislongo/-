import React from "react";
import ProvidedServices from "./ProvidedServices";

const contexts = new Map<ProvidedServices, React.Context<any | undefined>>();

const Contextualizer = {
  createContext: <T>(
    service: ProvidedServices
  ): React.Context<T | undefined> => {
    const context = React.createContext<T | undefined>(undefined);
    contexts.set(service, context);

    return context;
  },

  use: <T>(services: ProvidedServices): T => {
    const context = contexts.get(services);
    if (context === undefined) {
      throw new Error(`Contextualizer: service ${services} not created`);
    }

    //eslint-disable-next-line
    const service = React.useContext(context);

    if (service === undefined) {
      throw new Error(`Contextualizer: service ${services} not provided`);
    }

    return service;
  },

  clear() {
    contexts.clear();
  },
};

export default Contextualizer;
