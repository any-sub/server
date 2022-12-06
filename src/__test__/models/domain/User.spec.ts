import { expect, jest } from "@jest/globals";
import { User } from "../../../models";

describe("User", () => {
  const user = new User();

  it("should construct", () => {
    expect(user).toBeInstanceOf(User);
  });

  describe("isAdmin", () => {
    it("should be admin", () => {
      // Given
      user.roles = ["ADMIN"];

      // Then
      expect(user.isAdmin).toEqual(true);
    });
    it("should not be admin", () => {
      // Given
      user.roles = ["NOT ADMIN"];

      // Then
      expect(user.isAdmin).toEqual(false);
    });
  });

  describe("ifNotAdmin", () => {
    it("should return undefined if admin", () => {
      // Given
      user.roles = ["ADMIN"];

      // Then
      expect(user.ifNotAdmin).toBeUndefined();
    });
    it("should return self if not admin", () => {
      // Given
      user.roles = ["NOT ADMIN"];

      // Then
      expect(user.ifNotAdmin).toBe(user);
    });
  });
});
