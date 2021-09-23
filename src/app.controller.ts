import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly authService: AuthService) { }

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

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        console.log(req.user)
        return this.authService.login(req.user);
    }

    @Get("auth/guest")
    async guestLogin() {
        console.log("Logging a user in as as guest.");
        return this.authService.loginAsGuest();
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
