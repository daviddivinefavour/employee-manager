import { Injectable, Logger } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repo';
import { ResponseService } from '../../../shared/utils/respond.service';
import { TCreateUser } from '../interfaces/user.interface';
import { v4 } from 'uuid';
import { IResponseData } from 'src/shared/interfaces/shared.interfaces';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: Logger,
    private readonly responseService: ResponseService,
  ) {}

  async getUserByEmail(email: string) {
    const user = await this.userRepository.getUserByEmail(email);
    if (!user) {
      this.logger.error(`Unable to retrieve user with the email: ${email}`);
      return this.responseService.failResult('Unable to retrieve user');
    }
    return this.responseService.returnResult({
      success: true,
      message: 'User gotten successfully',
      data: user,
    });
  }
  async getUserById(id: string) {
    const user = await this.userRepository.getUserById(id);
    if (!user) {
      this.logger.error('Unable to retrieve user with the id: ', { id });
      return this.responseService.failResult('Unable to retrieve user');
    }
    return this.responseService.returnResult({
      success: true,
      message: 'User gotten successfully',
      data: user,
    });
  }
  async createUser(createUserDto: TCreateUser): Promise<IResponseData> {
    let user = await this.userRepository.getUserByEmail(createUserDto.email);
    if (user) {
      this.logger.error('Failed to create user');
      return this.responseService.failResult(
        'Email already registered, try logging in',
      );
    }

    user = await this.userRepository.createUser({
      id: v4(),
      ...createUserDto,
    });
    return this.responseService.returnResult({
      success: true,
      message: 'User created successfully',
      data: user,
    });
  }
}
