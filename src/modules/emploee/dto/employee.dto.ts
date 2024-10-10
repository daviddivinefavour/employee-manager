import { IsDateString, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { IEmployeeAttributes } from '../interfaces/employee.interface';

export class CreateEmployeeRequestDto implements IEmployeeAttributes {
  @IsString()
  @IsNotEmpty({ message: 'First name is mandatory' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Last name is mandatory' })
  lastName: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Department is mandatory' })
  department: string;

  @IsDateString()
  @IsNotEmpty({ message: 'Start date is mandatory' })
  startDate: Date;

  @IsString()
  @IsNotEmpty({ message: 'Job role is mandatory' })
  jobRole: string;

  @IsDateString()
  birthday: Date;
}
