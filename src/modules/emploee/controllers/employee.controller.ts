import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Delete,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Query,
  Put,
  Patch,
} from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { Request, Response } from 'express';
import { getUserIdFromRequest } from 'src/shared/utils/authentication.utils';
import { JwtAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { CreateEmployeeRequestDto } from '../dto/employee.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async getEmployeeById(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response> {
    const userId = getUserIdFromRequest(req);
    const employee = await this.employeeService.getEmployeeById(id, userId);
    if (employee.success) {
      return res.status(HttpStatus.OK).json({
        message: employee.message,
        data: employee.data,
      });
    }
    return res.status(HttpStatus.NOT_FOUND).json({ error: employee.message });
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async getEmployeesByUserId(
    @Req() req: Request,
    @Res() res: Response,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 25,
  ): Promise<Response> {
    const userId = getUserIdFromRequest(req);
    const employees = await this.employeeService.getEmployeesByUserId(
      userId,
      page,
      limit,
    );
    if (employees.success) {
      return res.status(HttpStatus.OK).json({
        message: employees.message,
        data: employees.data,
      });
    }
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json({ error: employees.message });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async createEmployee(
    @Body() createEmployeeDto: CreateEmployeeRequestDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const userId = getUserIdFromRequest(req);
    const result = await this.employeeService.createEmployee({
      ...createEmployeeDto,
      userId,
    });
    if (result.success) {
      return res.status(HttpStatus.CREATED).json({
        message: result.message,
        data: result.data,
      });
    }
    return res.status(HttpStatus.BAD_REQUEST).json({ error: result.message });
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async updateEmployee(
    @Param('id') id: string,
    @Body() createEmployeeDto: CreateEmployeeRequestDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const userId = getUserIdFromRequest(req);
    const result = await this.employeeService.updateEmployee(id, {
      ...createEmployeeDto,
      userId,
    });
    if (result.success) {
      return res.status(HttpStatus.OK).json({
        message: result.message,
        data: result.data,
      });
    }
    return res.status(HttpStatus.BAD_REQUEST).json({ error: result.message });
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async deleteEmployee(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response> {
    const userId = getUserIdFromRequest(req);
    const result = await this.employeeService.deleteEmployee(id, userId);
    if (result.success) {
      return res.status(HttpStatus.OK).json({
        message: result.message,
      });
    }
    return res.status(HttpStatus.BAD_REQUEST).json({ error: result.message });
  }

  @Patch('/:id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async archiveEmployee(
    @Param('id') id: string,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<Response> {
    const userId = getUserIdFromRequest(req);
    const result = await this.employeeService.archiveEmployee(id, userId);
    if (result.success) {
      return res.status(HttpStatus.OK).json({
        message: result.message,
      });
    }
    return res.status(HttpStatus.BAD_REQUEST).json({ error: result.message });
  }
}
