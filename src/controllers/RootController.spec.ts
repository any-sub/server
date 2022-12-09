import { expect, jest } from "@jest/globals";
import { PlatformTest, Res } from "@tsed/common";
import { RootController } from "./RootController";
import { User } from "../models";

describe("RootController", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  const mockRequest = {
    redirect: jest.fn()
  } as unknown as jest.Mocked<Res>;

  it("should redirect to login when no user in session", () => {
    // Given
    const instance = PlatformTest.get<RootController>(RootController);

    // When
    instance.getRoot(mockRequest);

    // Then
    expect(mockRequest.redirect.mock.calls.length).toEqual(1);
    expect(mockRequest.redirect.mock.calls[0][0]).toEqual("/login");
  });

  it("should do nothing when user present in session", () => {
    // Given
    const instance = PlatformTest.get<RootController>(RootController);

    // When
    instance.getRoot(mockRequest, new User());

    // Then
    expect(mockRequest.redirect.mock.calls.length).toEqual(0);
  });
});
