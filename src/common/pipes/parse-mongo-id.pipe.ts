import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
  // Recordar que los pipes transforman la data.
  // En este caso nos aseguramos que el id enviando por url sea un Mongo _id
  transform(value: string, metadata: ArgumentMetadata) {
    //console.log({ value, metadata });

    if (!isValidObjectId(value)) {
      throw new BadRequestException(`${value} is not a valid MongoID`);
    }

    return value;
  }
}
