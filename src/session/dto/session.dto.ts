import { IsString, IsInt } from 'class-validator';


export class JoinSession {
    @IsString()
    session: string;

    @IsString()
    user: string;

    @IsInt()
    breed: number;

    @IsString()
    other: string
}
