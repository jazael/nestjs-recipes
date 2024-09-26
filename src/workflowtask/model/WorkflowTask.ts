import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'workflowtask', timestamps: false })
export class WorkflowTask extends Model<WorkflowTask> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  taskname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  nextstep: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  descripcionstep: string;

  @Column({
    type: DataType.JSONB,
    allowNull: true,
  })
  conditions: any;
}
