import { PlatformTest } from "@tsed/common";
import { NotFound } from "@tsed/exceptions";
import { Chance } from "chance";
import { UsersRepository } from "../generated/prisma";
import { UserMapper } from "../mappers/UserMapper";
import { User } from "../models";
import { LookupDelegator } from "./LookupDelegator";

jest.mock("../generated/prisma/services/PrismaService");

const chance = new Chance();
const userMapperMock = {
  token: UserMapper,
  use: {
    toDomain: jest.fn()
  }
};

describe("LookupDelegator", () => {
  beforeEach(() => {
    userMapperMock.use.toDomain.mockReset();
    PlatformTest.create();
  });
  afterEach(PlatformTest.reset);

  it("should throw when user not found", async () => {
    // Given
    const user = new User();
    const instance = await PlatformTest.invoke<LookupDelegator>(LookupDelegator, [
      userMapperMock,
      {
        token: UsersRepository,
        use: {
          findFirst: () => null
        }
      }
    ]);

    // When
    const expectRejected = expect(async () => instance.findAllByUser(user)).rejects;

    // Then
    await expectRejected.toBeInstanceOf(NotFound);
    expect(userMapperMock.use.toDomain).not.toBeCalled();
  });

  it("should find user with lookups", async () => {
    // Given
    const user = new User();
    user.id = chance.string();
    const userModelMock = jest.fn();
    const findFirstMock = jest.fn().mockImplementation(() => {
      return userModelMock;
    });
    const instance = await PlatformTest.invoke<LookupDelegator>(LookupDelegator, [
      userMapperMock,
      {
        token: UsersRepository,
        use: {
          findFirst: findFirstMock
        }
      }
    ]);

    // When
    const result = await instance.findAllByUser(user);

    // Then
    expect(userMapperMock.use.toDomain).toBeCalledWith(userModelMock);
    expect(findFirstMock).toBeCalledWith({
      where: {
        id: user.id
      },
      include: {
        singleHtmlElementLookup: true
      }
    });
  });
});
