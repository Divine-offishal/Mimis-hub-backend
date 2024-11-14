import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthPayloadDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
