import { PlatformTest } from "@tsed/common";
import SuperTest from "supertest";
import { setUpContainers } from "./__test__/IntegrationTestUtils";

describe("Server", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;
  setUpContainers();

  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  it("should call GET /rest", async () => {
    const response = await request.get("/rest").expect(404);

    expect(response.body).toEqual({
      errors: [],
      message: 'Resource "/rest" not found',
      name: "NOT_FOUND",
      status: 404
    });
  });
});
