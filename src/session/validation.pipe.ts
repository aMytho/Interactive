import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(data, { metatype }: ArgumentMetadata) {
        console.log(data)
        if (!metatype || !this.toValidate(metatype)) {
            return data;
        }
        const object = plainToClass(metatype, data);
        const errors = await validate(object);
        if (errors.length > 0) {
            console.log(false);
            throw new WsException("MASSIVE ERROR OH NO AAAAAA");
        }
        return data;
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
}