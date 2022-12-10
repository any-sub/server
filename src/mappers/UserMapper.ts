import { Injectable } from "@tsed/di";
import { UserModel } from "../generated/prisma";
import { User } from "../models";

@Injectable()
export class UserMapper {
  public toDomain(model: UserModel): User {
    const user = new User();
    user.id = model.id;
    user.email = model.email;
    return user;
  }
}
