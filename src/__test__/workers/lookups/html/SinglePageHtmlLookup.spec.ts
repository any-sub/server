import { expect, jest } from "@jest/globals";
import { SinglePageHtmlLookup } from "../../../../workers/lookups/html/SinglePageHtmlLookup";
import { Chance } from "chance";

const chance = new Chance();

describe("SinglePageHtmlLookup", () => {
  it("should create an instance", () => {
    // When
    const instance = new SinglePageHtmlLookup("<html/>");

    // Then
    expect(instance).toBeInstanceOf(SinglePageHtmlLookup);
  });

  it("should get the contents of an element by full css path", () => {
    // Given
    const actualContent = chance.string({ symbols: false });
    const instance = new SinglePageHtmlLookup(`<body><p id="myParagraph">${actualContent}</p></body>`);

    // When
    const content = instance.contentOf("body>p#myParagraph");

    // Then
    expect(content).toEqual(actualContent);
  });

  it("should get the contents of an element by partial css path", () => {
    // Given
    const actualContent = chance.string({ symbols: false });
    const instance = new SinglePageHtmlLookup(`<body><p id="myParagraph">${actualContent}</p></body>`);

    // When
    const content = instance.contentOf("#myParagraph");

    // Then
    expect(content).toEqual(actualContent);
  });
});
