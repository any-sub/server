import { JSDOM } from 'jsdom';

export abstract class HtmlLookup {
  protected readonly html: string;

  constructor(html: string) {
    this.html = html;
  }

  protected parse() {
    return new JSDOM(this.html);
  }
}
