import IFCElement from "./ifcelement.model";

export default interface Storey extends IFCElement {
  name: string;
  level: number;
}
