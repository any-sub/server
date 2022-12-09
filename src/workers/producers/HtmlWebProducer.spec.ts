import { expect } from "@jest/globals";
import { Chance } from "chance";
import { HtmlWebProducer } from "./HtmlWebProducer";
import { MockServer } from "jest-mock-server";

const chance = new Chance();

describe("HtmlWebProducer", () => {
  const server = new MockServer();

  beforeAll(() => server.start());
  afterAll(() => server.stop());
  beforeEach(() => server.reset());

  it("should create an instance", () => {
    // When
    const instance = new HtmlWebProducer();

    // Then
    expect(instance).toBeInstanceOf(HtmlWebProducer);
  });

  it("should get the html contents of a url", async () => {
    // Given
    const actualContent = chance.string();
    const instance = new HtmlWebProducer();
    const route = server.get("/").mockImplementationOnce((ctx) => {
      ctx.status = 200;
      ctx.body = actualContent;
    });
    const url = server.getURL();

    // When
    const content = await instance.bodyOf(url.toString());

    // Then
    expect(content).toEqual(actualContent);
    expect(route).toHaveBeenCalledTimes(1);
  });
});
