import { Injectable, Logger } from '@nestjs/common';
import { EmployeeRepository } from '../repositories/employee.repo';
import { ResponseService } from '../../../shared/utils/respond.service';
import { IResponseData } from 'src/shared/interfaces/shared.interfaces';
import { v4 } from 'uuid';
import { HelpersService } from 'src/shared/utils/helpers';
import { IEmployee } from '../interfaces/employee.interface';

@Injectable()
export class EmployeeService {
  constructor(
    private readonly employeeRepository: EmployeeRepository,
    private readonly logger: Logger,
    private readonly responseService: ResponseService,
    private readonly helperService: HelpersService,
  ) {}

  async getEmployeeById(id: string, userId: string): Promise<IResponseData> {
    const employee = await this.employeeRepository.getEmployee(id, userId);
    if (!employee) {
      this.logger.error(`Unable to retrieve employee with the id: ${id}`);
      return this.responseService.failResult('Unable to retrieve employee');
    }
    return this.responseService.returnResult({
      success: true,
      message: 'Employee retrieved successfully',
      data: employee,
    });
  }

  async getEmployeesByUserId(
    userId: string,
    page: number,
    limit: number,
  ): Promise<IResponseData> {
    const employees = await this.employeeRepository.getEmployeesByUserId(
      userId,
      page,
      limit,
    );
    if (!employees) {
      this.logger.error('Unable to retrieve employees for the userId: ', {
        userId,
      });
      return this.responseService.failResult(
        'Unable to retrieve employees for the user',
      );
    }
    const paginatedData = this.helperService.paginate(employees, page, limit);
    return this.responseService.returnResult({
      success: true,
      message: 'Employees retrieved successfully',
      data: paginatedData,
    });
  }

  async createEmployee(createEmployeeDto: IEmployee): Promise<IResponseData> {
    const employee = await this.employeeRepository.createEmployee({
      id: v4(),
      ...createEmployeeDto,
    });

    return this.responseService.returnResult({
      success: true,
      message: 'Employee created successfully',
      data: employee,
    });
  }

  async updateEmployee(
    id: string,
    updateEmployeeDto: IEmployee,
  ): Promise<IResponseData> {
    const [_, updated] = await this.employeeRepository.updateEmployee({
      ...updateEmployeeDto,
      id,
    });

    if (!updated) {
      this.logger.error(`Unable to update employee with id: ${id}`);
      return this.responseService.failResult('Unable to update employee');
    }

    return this.responseService.returnResult({
      success: true,
      message: 'Employee details updated successfully',
      data: updated[0],
    });
  }

  async deleteEmployee(id: string, userId: string): Promise<IResponseData> {
    const deleted = await this.employeeRepository.deleteEmployee(id, userId);
    if (!deleted) {
      this.logger.error(`Unable to delete employee with id: ${id}`);
      return this.responseService.failResult('Unable to delete employee');
    }

    return this.responseService.returnResult({
      success: true,
      message: 'Employee deleted successfully',
    });
  }
  async archiveEmployee(id: string, userId: string): Promise<IResponseData> {
    const [count, archived] = await this.employeeRepository.addToArchives(
      id,
      userId,
    );

    if (!archived || count < 1) {
      this.logger.error(`Failed to add employee with id: ${id} to archive`);
      return this.responseService.failResult(
        'Unable to add employee to archive',
      );
    }

    return this.responseService.returnResult({
      success: true,
      message: 'Employee archived successfully',
    });
  }
}
