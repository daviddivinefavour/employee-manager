import {
  Column,
  Model,
  PrimaryKey,
  Table,
  DeletedAt,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from 'src/modules/user/models/user.model';

@Table({
  tableName: 'employees',
  timestamps: true,
  underscored: true,
  modelName: 'employee',
  paranoid: true,
})
export class Employee extends Model<Employee> {
  @PrimaryKey
  @Column
  id: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @BelongsTo(() => User, 'userId')
  user: User;

  @Column
  startDate: Date;

  @Column
  department: string;

  @Column
  jobRole: string;

  @Column
  birthday: Date;

  @Column
  archivedAt?: Date;

  @Column
  userId: string;

  @DeletedAt
  deletedAt?: Date;
}
