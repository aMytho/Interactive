import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }


    @Get('/home')
    getHomePage(): string {
        return `This is the homepage for the interactive service. This project will be close to mixplay, and implements some of the mixplay API.
        However, this is its own project.`
    }

    @Get("/info")
    getTerminlogy() {
        let boardInfo = `A board is the project hosting all of the info about your project. This contains the source code`
        let sessionInfo = `A session contains the board and the active users.`
        return [boardInfo, sessionInfo];
    }
}
