import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  HttpCode,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { Prisma, User, User as UserModel } from "@prisma/client";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":userId")
  @HttpCode(200)
  getUserById(@Param("userId") userId: string): Promise<UserModel> {
    return this.userService.user({ id: Number(userId) });
  }

  @Post()
  @HttpCode(200)
  getUsers(
    @Body()
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.UserWhereUniqueInput;
      where?: Prisma.UserWhereInput;
      orderBy?: Prisma.UserOrderByWithRelationInput;
    }
  ): Promise<UserModel[]> {
    return this.userService.users(params);
  }

  @Post("create-user")
  @HttpCode(201)
  createUser(
    @Body() userData: { email: string; password: string; name: string }
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  @Patch(":userId")
  @HttpCode(200)
  updateUserById(
    @Param("userId") userId: string,
    @Body() dataUpdate: Prisma.UserUpdateInput
  ): Promise<UserModel> {
    return this.userService.updateUser({
      where: { id: Number(userId) },
      data: dataUpdate,
    });
  }

  @Delete(":userId")
  @HttpCode(204)
  deleteUserById(@Param("userId") userId: string): Promise<User> {
    return this.userService.deleteUser({ id: Number(userId) });
  }
}
