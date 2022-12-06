import { PlatformTest } from "@tsed/common";
import { LoginController } from "../../../controllers";

describe("LoginController", () => {
  beforeEach(PlatformTest.create);
  afterEach(PlatformTest.reset);

  it("should do something", () => {
    const instance = PlatformTest.get<LoginController>(LoginController);
    // const instance = PlatformTest.invoke<LoginController>(LoginController); // get fresh instance

    expect(instance).toBeInstanceOf(LoginController);
  });
});
