import { IsEmail, IsString, MinLength } from 'class-validator';
import { ISuccessfulAuthenticationData } from 'src/modules/authentication/interfaces/authentication.interface';

export class LoginRequestDto {
  @IsEmail({}, { message: 'Please provide a valid email' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}

export class LoginSuccessResponseDto {
  message: string;
  data: ISuccessfulAuthenticationData;
}

export class LoginErrorResponseDto {
  error: string;
}
