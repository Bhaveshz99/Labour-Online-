import { SocketContext } from "./socketContext";
import * as io from 'socket.io-client';

export const SocketState = (props: any) => {

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
            {props.children}
        </SocketContext.Provider>
    )
}