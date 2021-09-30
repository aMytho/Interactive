import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { BasePacket } from 'src/packet/dto/packet.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SessionService {
  create(socket: Socket) {
    socket.join("example");
    return { event: "msgToClient", data: "test" }
  }

  findAll() {
    return { event: 'msgToClient', data: "Returns all sessions" };
  }

  findOne(id: number) {
    return `This action returns a #${id} session`;
  }

  update(id: number, updateSessionDto: UpdateSessionDto) {
    return `This action updates a #${id} session`;
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }

  sendRandomMessage(socket: Socket) {
    socket.emit("msgToClient", this.generateRandomString())
  }

  sendToRoomOnly(_socket: Socket, server: Server) {
    server.to("example").emit("msgToClient", 5000);
    console.log("THis is a room");
  }

  activateMethod(packet: BasePacket) {
    
  }

  sendToRoom(server: Server, room: string, packet) {

  }

  private generateRandomString() {
    let r = (Math.random() + 1).toString(36).substring(7);
    console.log("random", r);
    return r
  }
}
