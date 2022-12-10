import { Inject, Injectable } from "@tsed/di";
import { NoContentFromLookup } from "../../../Errors";
import { HtmlWebProducer } from "../../producers/HtmlWebProducer";
import { HtmlLookup } from "./HtmlLookupWorker";

@Injectable()
export class SingleHtmlElementLookupWorker extends HtmlLookup {
  @Inject() private webProducer: HtmlWebProducer;

  public async contentOf(url: string, lookup: string): Promise<string> {
    const html = await this.webProducer.bodyOf(url);
    const document = this.parse(html).window.document;
    const content = document.querySelector(lookup)?.textContent;

    if (!content) {
      throw new NoContentFromLookup(url, lookup);
    }

    return content;
  }
}
