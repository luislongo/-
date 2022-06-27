import IFCElement from "./ifcelement.model";

export type StoreyConstraint = {
  refGuid: string;
  offset: number;
};
export default interface Project extends IFCElement {
  name: string;
  elements: { [guid: string]: any };
  storeys: string[];
  storeyConstraints: { [guid: string]: StoreyConstraint };
}
