import { Inject, Injectable } from "@tsed/di";
import { HttpFetch } from "../base/HttpFetch";
import { HTMLSource, HttpReader } from "./HttpReader";

@Injectable()
export class HtmlReader extends HttpReader<HTMLSource> {
  @Inject() httpFetch: HttpFetch;

  protected getAcceptedContentType(): string {
    return "text/html";
  }

  public async read(rawURL: string) {
    const [contents] = await this.readURL(this.httpFetch, rawURL);
    return contents;
  }
}
