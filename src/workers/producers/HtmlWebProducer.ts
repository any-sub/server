import { Injectable } from "@tsed/di";
import fetch from "node-fetch";

@Injectable()
export class HtmlWebProducer {
  public async bodyOf(url: string): Promise<string> {
    return fetch(url).then((res) => res.text());
  }
}
