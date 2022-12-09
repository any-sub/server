import { expect, jest } from "@jest/globals";
import { Context, PlatformTest, Req } from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions";
import { User } from "../models";
import { AcceptRolesMiddleware } from "./AcceptRolesMiddleware";

describe("AcceptRolesMiddleware", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  const mockContext = {
    endpoint: {
      get: jest.fn()
    }
  } as unknown as jest.Mocked<Context>;

  const mockRequest = {
    isAuthenticated: jest.fn()
  } as unknown as jest.Mocked<Req>;

  it("should continue when user not set", async () => {
    // Given
    const instance = await PlatformTest.invoke<AcceptRolesMiddleware>(AcceptRolesMiddleware);

    // When
    instance.use(mockContext, mockRequest, null!);

    // Then
    expect(mockContext.endpoint.get).not.toHaveBeenCalled();
  });

  it("should continue when request not authenticated", async () => {
    // Given
    const instance = await PlatformTest.invoke<AcceptRolesMiddleware>(AcceptRolesMiddleware);
    mockRequest.isAuthenticated.mockImplementation(() => false);

    // When
    instance.use(mockContext, mockRequest, new User());

    // Then
    expect(mockContext.endpoint.get).not.toHaveBeenCalled();
  });

  describe("authenticated", () => {
    beforeEach(() => {
      mockRequest.isAuthenticated.mockImplementation(() => true);
    });

    it("should continue when user is admin", async () => {
      // Given
      const instance = await PlatformTest.invoke<AcceptRolesMiddleware>(AcceptRolesMiddleware);
      mockContext.endpoint.get.mockImplementation(() => ["SOME ROLE"] as any);
      const user = new User();
      user.roles = ["ADMIN"];

      // When
      instance.use(mockContext, mockRequest, user);

      // Then
      expect(mockContext.endpoint.get).toHaveBeenCalled();
    });

    it("should continue when user has required role", async () => {
      // Given
      const instance = await PlatformTest.invoke<AcceptRolesMiddleware>(AcceptRolesMiddleware);
      mockContext.endpoint.get.mockImplementation(() => ["SOME ROLE"] as any);
      const user = new User();
      user.roles = ["SOME ROLE"];

      // When
      instance.use(mockContext, mockRequest, user);

      // Then
      expect(mockContext.endpoint.get).toHaveBeenCalled();
    });

    it("should continue when user has required role from list of roles", async () => {
      // Given
      const instance = await PlatformTest.invoke<AcceptRolesMiddleware>(AcceptRolesMiddleware);
      mockContext.endpoint.get.mockImplementation(() => ["SOME ROLE", "SOME OTHER ROLE", "FOO"] as any);
      const user = new User();
      user.roles = ["SOME OTHER ROLE"];

      // When
      instance.use(mockContext, mockRequest, user);

      // Then
      expect(mockContext.endpoint.get).toHaveBeenCalled();
    });

    it("should continue when user has some roles from list of roles", async () => {
      // Given
      const instance = await PlatformTest.invoke<AcceptRolesMiddleware>(AcceptRolesMiddleware);
      mockContext.endpoint.get.mockImplementation(() => ["SOME ROLE", "SOME OTHER ROLE", "FOO"] as any);
      const user = new User();
      user.roles = ["ROLE1", "FOO", "BAR"];

      // When
      instance.use(mockContext, mockRequest, user);

      // Then
      expect(mockContext.endpoint.get).toHaveBeenCalled();
    });

    it("should throw when user does not have required role", async () => {
      // Given
      const instance = await PlatformTest.invoke<AcceptRolesMiddleware>(AcceptRolesMiddleware);
      mockContext.endpoint.get.mockImplementation(() => ["SOME ROLE"] as any);
      const user = new User();
      user.roles = ["SOME OTHER ROLE"];

      // When
      const expectRejected = expect(async () => instance.use(mockContext, mockRequest, user)).rejects;

      // Then
      await expectRejected.toBeInstanceOf(Unauthorized);
      expect(mockContext.endpoint.get).toHaveBeenCalled();
    });
  });
});
