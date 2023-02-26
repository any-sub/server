import { Consumer, ConsumerOptions, ElementLookupOptions, LookupMode } from "./Consumer";
import { HtmlSource } from "../readers/HttpReader";
import { State } from "../state/State";
import { Injectable } from "@tsed/di";
import { JSDOM } from "jsdom";
import Handlebars from "handlebars";

@Injectable()
export class HtmlConsumer extends Consumer<HtmlSource> {
  public consume(source: HtmlSource, options: ConsumerOptions): State {
    const dom = this.convert(source, options);
    const container = this.getContainer(dom, options.lookup.container);

    if (!container) {
      throw new Error("Container not found.");
    }

    const content = this.getContentArray(options, container);
    return { data: this.buildReporting(options, content) };
  }

  private buildReporting(options: ConsumerOptions, content: string[]) {
    if (options.reporting) {
      const { search, messageTemplate } = options.reporting;

      if (!messageTemplate) {
        return content.filter((t) => search.test(t));
      }

      const template = Handlebars.compile(messageTemplate);
      return content
        .map((text) => text.match(search)?.groups)
        .filter(Boolean)
        .map((groups) => template(groups));
    }

    return content;
  }

  private getContentArray(options: ConsumerOptions, container: Element): string[] {
    const content: (string | null)[] = [];
    if (options.lookup.children) {
      const children = this.getChildren(container, options.lookup.children);
      for (const child of children) {
        content.push(child.textContent);
      }
    } else {
      content.push(container.textContent);
    }
    return content.filter(Boolean) as string[];
  }

  private convert(source: HtmlSource, options: ConsumerOptions): JSDOM {
    return new JSDOM(source, {
      url: options.originURL?.toString()
    });
  }

  protected getContainer(dom: JSDOM, containerLookupOptions: ElementLookupOptions): Element | null {
    return this.lookup(dom.window.document, containerLookupOptions);
  }

  protected getChildren(container: Element, childrenLookupOptions: ElementLookupOptions): NodeListOf<Element> {
    return this.lookup(container, childrenLookupOptions, true);
  }

  protected lookup(element: Element | Document, options: ElementLookupOptions): Element | null;
  protected lookup(element: Element | Document, options: ElementLookupOptions, multiple: boolean): NodeListOf<Element>;
  protected lookup(
    element: Element | Document,
    { mode, value }: ElementLookupOptions,
    multiple: boolean = false
  ): Element | NodeList | null {
    if (multiple && mode === LookupMode.ALL) {
      return element.childNodes;
    }

    if (mode !== LookupMode.CSS) {
      // TODO
      throw new Error("CSS");
    }

    if (multiple) {
      return element.querySelectorAll(value);
    }
    return element.querySelector(value);
  }
}
