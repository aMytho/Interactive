import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { SessionModule } from './session/session.module';

@Module({
    imports: [BoardModule, SessionModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
