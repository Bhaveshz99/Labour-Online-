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

<<<<<<< HEAD
    let token: any = localStorage.getItem('token');

    const socket: any = io.connect('http://localhost:8080', {
        transports: ["websocket"],
        auth: { token },
        upgrade: false,
        reconnection: true,
    });

=======
>>>>>>> a7677b389573f57166ce2c9b1186ea38bff63f9a
    return (
        <SocketContext.Provider value={{ socket }}>
            {props.children}
        </SocketContext.Provider>
    )
}

export default SocketState;