import { Logger, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ResponseService } from 'src/shared/utils/respond.service';
import { JwtStrategy } from '../../shared/strategies/jwt.strategy';
import { TOKEN_SECRET } from 'src/config/constants';
import { HelpersService } from 'src/shared/utils/helpers';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from './models/employee.model';
import { EmployeeRepository } from './repositories/employee.repo';
import { EmployeeService } from './services/employee.service';
import { EmployeeController } from './controllers/employee.controller';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/services/user.service';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';

@Module({
  imports: [
    UserModule,
    SequelizeModule.forFeature([Employee]),
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
    EmployeeRepository,
    EmployeeService,
    JwtStrategy,
    JwtAuthGuard,
  ],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
