import { Injectable } from '@nestjs/common';
import {
  IsString,
  IsInt,
  MinLength,
  MaxLength,
  Matches,
  IsNotEmpty,
} from 'class-validator';
import 'reflect-metadata';
import { FieldValidation } from '../model/FieldValidation';

interface Validation {
  field_name: string;
  is_required: boolean;
  min_length?: number;
  max_length?: number;
  regex_pattern?: string;
  field_type: string;
}

@Injectable()
export class ValidationService {
  private validationMap = {
    string: (validation: Validation) => {
      const rules = [];
      rules.push(IsString());
      if (validation.is_required) {
        rules.push(IsNotEmpty());
      }
      if (validation.min_length) {
        rules.push(MinLength(validation.min_length));
      }
      if (validation.max_length) {
        rules.push(MaxLength(validation.max_length));
      }
      if (validation.regex_pattern) {
        rules.push(Matches(new RegExp(validation.regex_pattern)));
      }
      return rules;
    },
    number: (validation: Validation) => {
      const rules = [];
      rules.push(IsInt());
      if (validation.is_required) {
        rules.push(IsNotEmpty());
      }
      return rules;
    },
  };

  async getValidationsForEntity(entity: string): Promise<FieldValidation[]> {
    return await FieldValidation.findAll({
      where: { entity_name: entity },
    });
  }

  async createDynamicDto(entity: string): Promise<any> {
    const validations = await this.getValidationsForEntity(entity);

    class DynamicDtoClass {}

    validations.forEach((validation) => {
      const validationFunction = this.validationMap[validation.field_type];
      if (validationFunction) {
        const rules = validationFunction(validation);

        rules.forEach((decorator) => {
          Reflect.decorate(
            [decorator],
            DynamicDtoClass.prototype,
            validation.field_name,
          );
        });
      } else {
        throw new Error(
          `No validation found for field type: ${validation.field_type}`,
        );
      }
    });

    return DynamicDtoClass;
  }
}
