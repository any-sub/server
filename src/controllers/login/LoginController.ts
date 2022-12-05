import { Controller } from "@tsed/di";
import { Get } from "@tsed/schema";
import { View } from "@tsed/platform-views";

@Controller("/login")
export class LoginController {
  @Get()
  @View("login/Login")
  public loginPage() {
    return;
  }
}
