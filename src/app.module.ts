import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { SessionModule } from './session/session.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PacketService } from './packet/packet.service';

@Module({
    imports: [BoardModule, SessionModule, AuthModule, UsersModule],
    controllers: [AppController],
    providers: [AppService, PacketService],
})
export class AppModule {}
