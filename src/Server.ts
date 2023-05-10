import "@tsed/ajv";
import { PlatformApplication } from "@tsed/common";
import { Configuration, Inject } from "@tsed/di";
import "@tsed/platform-express"; // /!\ keep this import
import { join } from "path";
import { config } from "./config";
import * as controllers from "./controllers";

@Configuration({
  ...config,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8080,
  socketIO: {},
  agenda: {
    enabled: true,
    db: {
      address: "mongodb://root:root@127.0.0.1"
    }
  },
  componentsScan: false,
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
  views: {
    root: join(process.cwd(), "../views"),
    extensions: {
      ejs: "ejs"
    }
  },
  exclude: ["**/*.spec.ts"]
})
export class Server {
  @Inject()
  protected app: PlatformApplication;

  @Configuration()
  protected settings: Configuration;
}
