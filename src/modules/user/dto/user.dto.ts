import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import {
  ISuccessfulAuthenticationData,
  IUserSignUp,
} from 'src/modules/authentication/interfaces/authentication.interface';
import { IsMatch } from 'src/shared/decorators/is-match.decorator';
import { IUser } from '../interfaces/user.interface';

export class GetUserSuccessResponseDto {
  message: string;
  data: IUser;
}

export class CreateUserResponseDto {
  message: string;
  data: ISuccessfulAuthenticationData;
}

export class CreateUserRequestDto implements IUserSignUp {
  @IsString()
  @IsNotEmpty({ message: 'First name is mandatory' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Last name is mandatory' })
  lastName: string;

  @IsEmail({}, { message: 'Please provide a valid email' })
  @IsNotEmpty({ message: 'Email is mandatory' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Confirm Password is mandatory' })
  @IsMatch('password', { message: 'Passwords do not match' })
  confirmPassword: string;
}

export class CreateUserErrorResponseDto {
  error: string;
}

export class GetUserBadRequestErrorResponseDto {
  error: string;
}
