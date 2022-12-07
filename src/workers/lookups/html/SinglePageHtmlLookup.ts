import { HtmlLookup } from "./HtmlLookup";

export class SinglePageHtmlLookup extends HtmlLookup {
  public contentOf(lookup: string): string | null {
    return this.parse().window.document.querySelector(lookup)?.textContent ?? null;
  }
}
