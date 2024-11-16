import { BadRequestException, Injectable } from '@nestjs/common';
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
    const findUser = await this.UserModel.findOne({ email }).lean();

    if (!findUser) return null;

    const comparePassword = await bcrypt.compare(password, findUser.password);

    if (!comparePassword) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...user } = findUser;

    const token = this.jwtService.sign(user);

    return { ...user, access_token: token };
  }

  async createUser(authPayloadDto: AuthPayloadDto): Promise<User> {
    try {
      const { email, password } = authPayloadDto;
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new this.UserModel({
        email: email,
        password: hashedPassword,
      });

      return await newUser.save();
    } catch (error) {
      if (error.code == 11000)
        throw new BadRequestException('A user with that email already exists.');

      throw error;
    }
  }
}
