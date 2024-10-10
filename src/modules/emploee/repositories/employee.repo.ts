import { InjectModel } from '@nestjs/sequelize';
import { Injectable } from '@nestjs/common';
import { Employee } from '../models/employee.model';
import { IEmployee } from '../interfaces/employee.interface';

@Injectable()
export class EmployeeRepository {
  constructor(
    @InjectModel(Employee)
    private employeeEntity: typeof Employee,
  ) {}

  async createEmployee(createEmployeeDto: IEmployee): Promise<Employee> {
    return this.employeeEntity.create(createEmployeeDto);
  }

  async getEmployee(
    employeeId: string,
    userId: string,
  ): Promise<Employee | null> {
    return this.employeeEntity.findOne({
      where: {
        id: employeeId,
        userId,
      },
    });
  }

  async updateEmployee(
    updateEmployeeDto: IEmployee,
  ): Promise<[number, Employee[]]> {
    return this.employeeEntity.update(updateEmployeeDto, {
      where: {
        userId: updateEmployeeDto.userId,
        id: updateEmployeeDto.id,
      },
      returning: true,
    });
  }

  async deleteEmployee(employeeId: string, userId: string): Promise<number> {
    return this.employeeEntity.destroy({ where: { id: employeeId, userId } });
  }

  async getEmployeesByUserId(
    userId: string,
    page: number,
    limit: number,
  ): Promise<{ rows: Employee[]; count: number }> {
    const offset = (page - 1) * limit;
    return this.employeeEntity.findAndCountAll({
      where: { userId },
      offset,
      limit,
    });
  }

  async addToArchives(
    employeeId: string,
    userId: string,
  ): Promise<[number, Employee[]]> {
    return this.employeeEntity.update(
      { archivedAt: new Date() },
      {
        where: {
          userId,
          id: employeeId,
        },
        returning: true,
      },
    );
  }
}
