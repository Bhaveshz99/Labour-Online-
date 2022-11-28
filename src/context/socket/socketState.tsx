import { SocketContext } from "./socketContext";
import * as io from 'socket.io-client';

export const socketState = (props: any) => {

    const socket: any = io.connect('http://localhost:8080', {
        transports: ["websocket"],
        auth: {
            token: "Bearer authorization_token_here"
        },
        upgrade: false,
        reconnection: true,
    });

    return (
        <SocketContext.Provider value={{ socket }}>
            complete recommendedProducts module
            testing in changes query and mutation
            try to set xlsx import formate
        </SocketContext.Provider>
    )
}