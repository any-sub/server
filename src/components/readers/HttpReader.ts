import { Response } from "node-fetch";
import { HttpFetch } from "../base/HttpFetch";

export abstract class HttpReader<T extends HttpSource> {
  public abstract read(url: string | URL): Promise<T>;

  protected abstract getAcceptedContentType(): string;

  protected async readURL(httpFetch: HttpFetch, rawURL: string | URL): Promise<[contents: string, res: Response]> {
    const url = new URL(rawURL);

    const res = await httpFetch.fetch(url, {
      headers: {
        Accept: this.getAcceptedContentType()
      }
    });

    if (!res.headers.get("content-type")?.startsWith(this.getAcceptedContentType())) {
      throw new Error("Content type returned does not match");
    }

    const contents = await res.text();

    if (!res.ok) {
      throw new Error(contents);
    }

    return [contents, res];
  }
}

export type HttpSource = XMLSource | HTMLSource | JSONSource;
export type XMLSource = string;
export type HTMLSource = string;
export type JSONSource = string;
