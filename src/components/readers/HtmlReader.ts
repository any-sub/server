import { Inject, Injectable } from "@tsed/di";
import { HttpFetch } from "../base/HttpFetch";

@Injectable()
export class HtmlReader {
  @Inject() httpFetch: HttpFetch;

  public async read(rawURL: string) {
    const url = new URL(rawURL);

    const res = await this.httpFetch.fetch(url, {
      headers: {
        Accept: "text/html"
      }
    });

    const contents = await res.text();

    if (!res.ok) {
      throw new Error(contents);
    }
    return contents;
  }
}
