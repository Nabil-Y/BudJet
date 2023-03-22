import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "@prisma/client";
import { AccessToken } from "src/dto/AccessToken";
import { JWTPaylod } from "src/dto/JWTPayload";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    email: string,
    pass: string
  ): Promise<Omit<User, "password"> | null> {
    const user = await this.userService.user({ email });
    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User): Promise<AccessToken> {
    const payload: JWTPaylod = { email: user.email, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
