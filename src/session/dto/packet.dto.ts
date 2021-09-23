import { IsString, IsInt, IsNotEmptyObject } from 'class-validator';


export class ClientPacket {
    @IsString()
    msgID: string;

    @IsNotEmptyObject()
    request: {
        instruction: any
    }
}