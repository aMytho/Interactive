import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch()
export class AllExceptionsFilter extends BaseWsExceptionFilter {
    catch(exception: WsException, host: ArgumentsHost) {
        super.catch(exception, host);
        (host.switchToWs().getClient() as Socket).emit("error", JSON.stringify(exception.getError()));
        console.log(exception.getError())
    }
}