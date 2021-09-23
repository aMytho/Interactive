export class Session {
    id: number;
    linkedBoard: string;
    connectedClients: Client[];
}

export class Client {
    id: number;
    username: string;
    role: "user"
}