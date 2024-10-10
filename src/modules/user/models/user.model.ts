import {
  Column,
  Model,
  PrimaryKey,
  DeletedAt,
  Table,
  TableOptions,
} from 'sequelize-typescript';
import { IUser } from '../interfaces/user.interface';

const tableOptions: TableOptions = {
  modelName: 'User',
  paranoid: true,
  tableName: 'users',
  timestamps: true,
  underscored: true,
};
@Table(tableOptions)
export class User extends Model<User> implements IUser {
  @PrimaryKey
  @Column
  id: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  email: string;

  @DeletedAt
  deletedAt?: any;
}
