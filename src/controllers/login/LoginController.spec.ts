import { PlatformTest } from "@tsed/common";
import { LoginController } from "..";

describe("LoginController", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    // const instance = PlatformTest.get<LoginController>(LoginController);
    //
    // expect(instance).toBeInstanceOf(LoginController);
  });
});
