import { Consumer, ConsumerOptions, ElementLookupOptions, LookupMode } from "./Consumer";
import { HTMLSource } from "../readers/HttpReader";
import { State } from "../state/State";
import { Injectable } from "@tsed/di";
import { JSDOM } from "jsdom";

@Injectable()
export class HTMLConsumer extends Consumer<HTMLSource> {
  public consume(source: HTMLSource, options: ConsumerOptions): State {
    const dom = this.convert(source, options);
    const container = this.getContainer(dom, options.lookup.container);

    if (!container) {
      throw new Error("Container not found.");
    }

    const content = this.getContentArray(options, container);

    const { search, messageTemplate } = options.reporting;
    const reported = content.map((text) => {
      const groups = text.match(search)?.groups ?? {};
      return messageTemplate; // TODO template
    });

    return { data: reported };
  }

  private getContentArray(options: ConsumerOptions, container: Element): string[] {
    const content: (string | null)[] = [];
    if (options.lookup.children) {
      const children = this.lookup(container, options.lookup.children, true);
      for (const child of children) {
        content.push(child.textContent);
      }
    } else {
      content.push(container.textContent);
    }
    return content.filter(Boolean) as string[];
  }

  private convert(source: HTMLSource, options: ConsumerOptions): JSDOM {
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
  ): Element | NodeListOf<Element> | null {
    if (mode !== LookupMode.CSS) {
      throw new Error("CSS");
    }

    if (multiple) {
      return element.querySelectorAll(value);
    }
    return element.querySelector(value);
  }
}
