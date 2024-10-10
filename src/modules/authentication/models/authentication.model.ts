import {
  Column,
  Model,
  PrimaryKey,
  Table,
  DeletedAt,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { IAuthentication } from '../interfaces/authentication.interface';
import { User } from 'src/modules/user/models/user.model';

@Table({
  tableName: 'authentications',
  timestamps: true,
  underscored: true,
  modelName: 'Authentication',
  paranoid: true,
})
export class Authentication
  extends Model<Authentication>
  implements IAuthentication
{
  @PrimaryKey
  @Column
  id: string;

  @Column
  password: string;

  @ForeignKey(() => User)
  @Column
  userId: string;

  @BelongsTo(() => User, 'userId')
  user: User;

  @Column
  lastSeen?: Date;

  @DeletedAt
  deletedAt?: any;
}
