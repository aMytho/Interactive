import { Injectable } from '@nestjs/common';
import { BasePacket } from './dto/packet.dto';

@Injectable()
export class PacketService {

    private generateID() {
        return "aaaa"
    }



    handlePacket(packet: BasePacket) {
        if (packet.type == "method") {
            
        }
    }


}
