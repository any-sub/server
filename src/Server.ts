import "@tsed/ajv";
import { PlatformApplication } from "@tsed/common";
import { Configuration, Inject } from "@tsed/di";
import "@tsed/platform-express";
import "@tsed/swagger";
import { config } from "./config";
import * as controllers from "./controllers";
import { envs, isProduction } from "./config/envs";

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: envs.PORT || 8080,
  socketIO: {},
  agenda: {
    enabled: true,
    defaultLockLifetime: isProduction ? 5 * 60 * 1000 : 1,
    db: {
      address: envs.MONGODB_CONNECTION
    }
  },
  mount: {
    "/": [...Object.values(controllers)]
  },
  middlewares: [
    "cors",
    "cookie-parser",
    "compression",
    "method-override",
    "json-parser",
    { use: "urlencoded-parser", options: { extended: true } }
  ],
  exclude: ["**/*.spec.ts"],
  swagger: [
    {
      path: "/docs",
      specVersion: "3.0.3"
    }
  ]
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;
}
