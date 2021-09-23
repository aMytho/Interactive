import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayInit, WsResponse, OnGatewayConnection, OnGatewayDisconnect} from '@nestjs/websockets';
import { SessionService } from './session.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { ClientPacket } from './dto/packet.dto';
import { ValidationPipe } from './validation.pipe';
import { UsePipes } from '@nestjs/common';

@WebSocketGateway()
export class SessionGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly sessionService: SessionService) { }

    private logger: Logger = new Logger('SessionGateway');

    afterInit(server: any) {
        this.logger.log('Initialized');
        this.logger.log(server);
    }

    @SubscribeMessage('createSession')
    create(@MessageBody() createSessionDto: CreateSessionDto) {
        return this.sessionService.create(createSessionDto);
    }

    @SubscribeMessage('findAllSession')
    findAll() {
        return this.sessionService.findAll();
    }

    @SubscribeMessage('findOneSession')
    findOne(@MessageBody() id: number) {
        return this.sessionService.findOne(id);
    }

    @SubscribeMessage('updateSession')
    update(@MessageBody() updateSessionDto: UpdateSessionDto) {
        return this.sessionService.update(updateSessionDto.id, updateSessionDto);
    }

    @SubscribeMessage('removeSession')
    remove(@MessageBody() id: number) {
        return this.sessionService.remove(id);
    }

    @SubscribeMessage('msgToServer')
    handleMessage(client: Socket, text: string): WsResponse<string> {
        console.log(text);
        return { event: 'msgToClient', data: "Hello world" };
    }


    @SubscribeMessage('request')
    @UsePipes(new ValidationPipe())
    handleRequest(client: Socket, data: ClientPacket, ): WsResponse<ClientPacket> {
        console.log(data);
        return {event: "msgToClient", data: data}
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log('Client connected', client.id);
    }
    handleDisconnect(client: Socket) {
        this.logger.log('Client disconnected', client.id);
    }
}
