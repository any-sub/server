import { JSDOM } from "jsdom";

export abstract class HtmlLookup {
  protected parse(html: string) {
    return new JSDOM(html);
  }
}
