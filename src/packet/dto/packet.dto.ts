export class BasePacket {
    type: "reply" | "method";
    id: string;
    params?: {}
}