import fetch from "node-fetch";

export class HtmlWebProducer {
  public async bodyOf(url: string): Promise<string> {
    return fetch(url).then((res) => res.text());
  }
}
