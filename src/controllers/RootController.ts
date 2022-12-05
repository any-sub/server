import { Req, Res } from "@tsed/common";
import { Controller } from "@tsed/di";
import { Get } from "@tsed/schema";
import { User } from "../models";

@Controller("/")
export class RootController {
  @Get("/")
  public getRoot(@Res() res: Res, @Req("user") user?: User) {
    if (!user) {
      return res.redirect("/login");
    }
  }
}
