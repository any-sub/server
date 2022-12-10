import { expect } from "@jest/globals";
import { PlatformTest } from "@tsed/common";
import { Chance } from "chance";
import { NoContentFromLookup } from "../../../Errors";
import { HtmlWebProducer } from "../../producers";
import { SingleHtmlElementLookupWorker } from "./SingleHtmlElementLookupWorker";

const chance = new Chance();

const mockedDependencies = (webProducerContent: string) => [
  {
    token: HtmlWebProducer,
    use: {
      bodyOf: (_url: string) => {
        return webProducerContent;
      }
    }
  }
];

describe("SingleHtmlElementLookupWorker", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should create an instance", async () => {
    // When
    const instance = await PlatformTest.invoke<SingleHtmlElementLookupWorker>(SingleHtmlElementLookupWorker);

    // Then
    expect(instance).toBeInstanceOf(SingleHtmlElementLookupWorker);
  });

  it("should throw if content cannot be found", async () => {
    // Given
    const deps = mockedDependencies(`<p></p>`);
    const instance = await PlatformTest.invoke<SingleHtmlElementLookupWorker>(SingleHtmlElementLookupWorker, deps);

    // When - Then
    const expectRejected = expect(() => instance.contentOf("some url", "body>p#myParagraph")).rejects;
    await expectRejected.toBeInstanceOf(NoContentFromLookup);
    await expectRejected.toMatchObject({
      url: "some url",
      lookup: "body>p#myParagraph"
    });
  });

  it("should get the contents of an element by full css path", async () => {
    // Given
    const actualContent = chance.string({ symbols: false });
    const deps = mockedDependencies(`<body><p id="myParagraph">${actualContent}</p></body>`);
    const instance = await PlatformTest.invoke<SingleHtmlElementLookupWorker>(SingleHtmlElementLookupWorker, deps);

    // When
    const content = await instance.contentOf("some url", "body>p#myParagraph");

    // Then
    expect(content).toEqual(actualContent);
  });

  it("should get the contents of an element by partial css path", async () => {
    // Given
    const actualContent = chance.string({ symbols: false });
    const deps = mockedDependencies(`<body><p id="myParagraph">${actualContent}</p></body>`);
    const instance = await PlatformTest.invoke<SingleHtmlElementLookupWorker>(SingleHtmlElementLookupWorker, deps);

    // When
    const content = await instance.contentOf("some url", "#myParagraph");

    // Then
    expect(content).toEqual(actualContent);
  });
});
