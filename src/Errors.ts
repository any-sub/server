export class NoContentFromLookup extends Error {
  public readonly url;
  public readonly lookup;

  constructor(url: string, lookup: string) {
    super();
    this.url = url;
    this.lookup = lookup;
  }

  public toString() {
    return `No content found for "${this.lookup}" at "${this.url}"`;
  }
}
