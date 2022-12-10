import { Inject, Injectable } from "@tsed/di";
import { NotFound } from "@tsed/exceptions";
import { UsersRepository } from "../generated/prisma";
import { UserMapper } from "../mappers/UserMapper";
import { User } from "../models";

@Injectable()
export class LookupDelegator {
  @Inject() private userRepository: UsersRepository;
  @Inject() private userMapper: UserMapper;

  public async findAllByUser(user: User): Promise<User> {
    const userModel = await this.userRepository.findFirst({
      where: {
        id: user.id
      },
      include: {
        singleHtmlElementLookup: true
      }
    });

    if (!userModel) {
      throw new NotFound("User not found");
    }

    return this.userMapper.toDomain(userModel);
  }
}
