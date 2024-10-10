import { Logger, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationRepository } from './repositories/authentication.repo';
import { AuthenticationService } from './services/authentication.service';
import { ResponseService } from 'src/shared/utils/respond.service';
import { AuthenticationController } from './controllers/authentication.controller';
import { TOKEN_SECRET } from 'src/config/constants';
import { HelpersService } from 'src/shared/utils/helpers';
import { SequelizeModule } from '@nestjs/sequelize';
import { Authentication } from './models/authentication.model';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/services/user.service';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    SequelizeModule.forFeature([Authentication]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: TOKEN_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [
    ResponseService,
    HelpersService,
    Logger,
    UserService,
    AuthenticationRepository,
    AuthenticationService,
    JwtStrategy,
    JwtAuthGuard,
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
