import { SocketContext } from "./socketContext";
import * as io from 'socket.io-client';
import { useEffect } from "react";

let socket: any = io.connect('http://localhost:8080', {
    transports: ["websocket"],
    auth: { token: localStorage.getItem('token') },
    upgrade: false,
    reconnection: true,
});

const SocketState = (props: any) => {

    return (
        <SocketContext.Provider value={{ socket }}>
            {props.children}
        </SocketContext.Provider>
    )
}

export default SocketState;