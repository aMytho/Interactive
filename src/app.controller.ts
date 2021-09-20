import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('/board/:id')
    getTest(@Param() params): string {
        console.log(params.id);
        return `${params.id} and more`;
    }
}
