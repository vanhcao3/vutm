import React from "react";
import io from "socket.io-client";

import { SOCKET_URL } from "@/config";

export const socket = io(`${SOCKET_URL}/simulation`, { path: "/at-sc/socket.io" });
socket.on("connected", () => {
     console.log("SOCKET CONNECTED");
});

export const SocketContext = React.createContext(socket);
