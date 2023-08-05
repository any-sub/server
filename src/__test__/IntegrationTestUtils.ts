import { GenericContainer, StartedTestContainer } from "testcontainers";
import { PlatformTest } from "@tsed/common";
import { Server } from "../Server";

export const setUpContainers = () => {
  let mongo: StartedTestContainer;
  let mysql: StartedTestContainer;

  beforeAll(async () => {
    const [startedMongo, startedMysql] = await Promise.all([
      new GenericContainer("mongo")
        .withExposedPorts(27017)
        .withEnvironment({
          MONGO_INITDB_ROOT_USERNAME: "root",
          MONGO_INITDB_ROOT_PASSWORD: "root"
        })
        .start(),

      new GenericContainer("mysql")
        .withExposedPorts(3306)
        .withEnvironment({
          MYSQL_ROOT_PASSWORD: "root"
        })
        .start()
    ]);
    mongo = startedMongo;
    mysql = startedMysql;
    await PlatformTest.bootstrap(Server, {
      agenda: {
        db: {
          address: `mongodb://root:root@127.0.0.1:${mongo.getMappedPort(27017)}`
        }
      },
      prisma: {
        datasources: {
          db: {
            url: `mysql://root:root@127.0.0.1:${mysql.getMappedPort(3306)}`
          }
        }
      }
    })();
  }, 1000 * 60);

  afterAll(async () => {
    await PlatformTest.reset();
    await mongo.stop();
  });
};
