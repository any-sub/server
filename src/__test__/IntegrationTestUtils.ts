import { GenericContainer, StartedTestContainer } from "testcontainers";
import { PlatformTest } from "@tsed/common";
import { Server } from "../Server";

export const setUpTest = () => {
  let container: StartedTestContainer;

  beforeAll(async () => {
    container = await new GenericContainer("mongo").withExposedPorts(27017).withEnvironment({
      MONGO_INITDB_ROOT_USERNAME: "root",
      MONGO_INITDB_ROOT_PASSWORD: "root"
    }).start();
    await PlatformTest.bootstrap(Server, {
      agenda: {
        db: {
          address: `mongodb://root:root@127.0.0.1:${container.getMappedPort(27017)}`
        }
      }
    })();
  }, 15000);

  afterAll(async () => {
    await PlatformTest.reset();
    await container.stop();
  });
};