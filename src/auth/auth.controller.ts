import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  loginUser(@Req() req: Request) {
    return req.user;
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  registerUser(@Body() authPayloadDto: AuthPayloadDto) {
    return this.authService.createUser(authPayloadDto);
  }
}
