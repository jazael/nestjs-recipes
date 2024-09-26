import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'fieldvalidations', timestamps: false })
export class FieldValidation extends Model<FieldValidation> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  field_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  entity_name: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  is_required: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  regex_pattern: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  min_length: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  max_length: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  field_type: string;
}
