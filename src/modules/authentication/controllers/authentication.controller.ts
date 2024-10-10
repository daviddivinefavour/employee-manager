import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthenticationService } from '../services/authentication.service';
import { Response } from 'express';
import { LoginRequestDto } from '../dto/authentication.dto';
import { Public } from 'src/shared/decorators/public.route.decorator';
import { CreateUserRequestDto } from 'src/modules/user/dto/user.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async login(
    @Body() loginDto: LoginRequestDto,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.authenticationService.login(loginDto);
    if (!user.success) {
      return res.status(HttpStatus.BAD_REQUEST).json({ error: user.message });
    }
    return res
      .status(HttpStatus.OK)
      .json({ message: user.message, data: user.data });
  }

  @Post('/register')
  @Public()
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createUser(
    @Body() createUserDto: CreateUserRequestDto,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.authenticationService.signup(createUserDto);
    if (user.success)
      return res.status(HttpStatus.CREATED).json({
        message: user.message,
        data: user.data,
      });
    return res.status(HttpStatus.BAD_REQUEST).json({ error: user.message });
  }
}
