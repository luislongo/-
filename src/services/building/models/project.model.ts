import Storey from "./storey.model";

export default interface Project {
  name: string;
  storeys: Storey[];
}
