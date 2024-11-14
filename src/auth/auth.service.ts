import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { AuthPayloadDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: AuthPayloadDto) {
    const findUser = await this.UserModel.findOne({ email });

    if (!findUser) return null;

    const comparePassword = await bcrypt.compare(password, findUser.password);

    if (!comparePassword) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...user } = findUser;

    return this.jwtService.sign(user);
  }
}
