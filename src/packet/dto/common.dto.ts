import { BasePacket } from "./packet.dto";

export class BaseMethodPacket implements BasePacket {
    constructor() {
        
    }
    type: "method";
    id: string;
    params: {};
}