import { Lookup, SelectorType } from "./Lookup";

export class SingleHtmlElementLookup extends Lookup {
  public id: string;
  public url: string;
  public selector: string;
  public selectorType: SelectorType;
  public expression?: RegExp;
}
