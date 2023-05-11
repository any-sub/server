import {PlatformTest} from "@tsed/common";
import SuperTest from "supertest";
import {LoginController} from "./LoginController";
import {Server} from "../../Server";

describe("LoginController", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeAll(PlatformTest.bootstrap(Server));
  beforeAll(() => {
    request = SuperTest(PlatformTest.callback());
  });
  afterAll(PlatformTest.reset);

  describe("GET /login", () => {
    it("should return login page", async () => {
      const response = await request.get("/login").expect(200);

      expect(response.type).toEqual("text/html");
      expect(response.text).toContain("Login");
      expect(response.text).toContain("Email");
      expect(response.text).toContain("Password");
    });
  })
});
