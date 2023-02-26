import { Inject, Injectable } from "@tsed/di";
import { HttpFetch } from "../base/HttpFetch";
import { HttpReader, JSONSource } from "./HttpReader";

@Injectable()
export class JsonReader extends HttpReader<JSONSource> {
  @Inject() httpFetch: HttpFetch;

  protected getAcceptedContentType(): string {
    return "application/json";
  }

  public async read(rawURL: string) {
    const [contents] = await this.readURL(this.httpFetch, rawURL);
    return contents;
  }
}
