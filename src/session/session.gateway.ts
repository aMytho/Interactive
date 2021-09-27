import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayInit, 
WsResponse, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer} from '@nestjs/websockets';
import { SessionService } from './session.service';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Logger, UsePipes } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ClientPacket } from './dto/packet.dto';
import { JoinSession } from './dto/session.dto';
import { ValidationPipe } from './validation.pipe';


@WebSocketGateway()
export class SessionGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly sessionService: SessionService) { }

    /**
     * The server instance. This holds all connections(sockets)
     */
    @WebSocketServer()
    private server: Server;

    private logger: Logger = new Logger('SessionGateway');

    afterInit(server: any) {
        this.logger.log('Initialized');
    }

    @SubscribeMessage('createSession')
    create(client: Socket): WsResponse<any> {
        this.logger.log("Creating a session for " + client.id)
        return this.sessionService.create(client);
    }

    @UsePipes(new ValidationPipe())
    @SubscribeMessage('findAllSession')
    findAll(@MessageBody() joinSession: JoinSession) {
        console.log(joinSession)
        console.log(true)
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
    handleRequest(client: Socket, data: ClientPacket, ): WsResponse<ClientPacket> {
        console.log(1);
        return {event: "msgToClient", data: data}
    }

    @SubscribeMessage("random")
    random(client: Socket) {
        this.sessionService.sendRandomMessage(client)
    }

    @SubscribeMessage("room")
    room(client: Socket) {
        this.sessionService.sendToRoomOnly(client, this.server);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log('Client connecteds', client.id);
    }

    handleDisconnect(client: Socket) {
        this.logger.log('Client disconnected', client.id);
    } 
}
