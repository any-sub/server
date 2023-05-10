import { Controller } from "@tsed/di";
import { Get, Post } from "@tsed/schema";
import { View } from "@tsed/platform-views";
import { Req, Res } from "@tsed/common";
import { User } from "../../models";

@Controller("/login")
export class LoginController {
  @Get()
  @View("login/Login")
  public loginPage(@Res() res: Res, @Req("user") user?: User) {
    if (user) {
      return res.redirect("/");
    }
  }

  @Post()
  public login(@Req() req: Req, @Res() res: Res) {
    return res.redirect("/");
  }
}
