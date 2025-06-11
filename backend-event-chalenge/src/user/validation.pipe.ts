import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class NewUserValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (errors: ValidationError[]) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error?.constraints
            ? Object.values(error?.constraints).join(', ')
            : 'unknow',
        }));
        return new BadRequestException({
          statusCode: 422,
          message: 'New user validation failed',
          errors: result,
        });
      },
    });
  }
}
