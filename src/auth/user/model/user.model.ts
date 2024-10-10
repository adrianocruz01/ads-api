// src/user/user.model.ts
import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ unique: true, allowNull: false })
  username: string;

  @Column({ allowNull: false })
  password: string;
}
