import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { validate as isUuid } from 'uuid';

@Injectable()
export class UuidValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!isUuid(value)) {
      throw new BadRequestException('Invalid UUID format');
    }
    return value;
  }
}
