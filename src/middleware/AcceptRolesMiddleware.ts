import { Req } from "@tsed/common";
import { Unauthorized } from "@tsed/exceptions";
import { Middleware } from "@tsed/platform-middlewares";
import { Context } from "@tsed/platform-params";
import { User } from "../models";

@Middleware()
export class AcceptRolesMiddleware {
  public use(@Context() ctx: Context, @Req() req: Req, @Req("user") user: User) {
    if (user && req.isAuthenticated()) {
      const acceptedRoles: Set<string> = new Set(["ADMIN"]);
      ctx.endpoint.get(AcceptRolesMiddleware).forEach((role: string) => acceptedRoles.add(role));

      if (!user.roles.some((role) => acceptedRoles.has(role))) {
        throw new Unauthorized("Insufficient role");
      }
    }
  }
}
