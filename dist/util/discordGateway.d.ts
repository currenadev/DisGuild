import * as WebSocket from "ws";
declare enum GatewayOpcode {
    DISPATCH = 0,
    HEARTBEAT = 1,
    IDENTIFY = 2,
    PRESENCE_UPDATE = 3,
    VOICE_STATUS_UPDATE = 4,
    RESUME = 6,
    RECONNECT = 7,
    REQUEST_GUILD_MEMBERS = 8,
    INVALID_SESSION = 9,
    HELLO = 10,
    HEARTBEAT_ACK = 11
}
declare type payloadJSONObject = {
    op: GatewayOpcode;
    d?: any;
    s?: number;
    t?: string;
};
declare class Payload {
    jsonObject: payloadJSONObject;
    constructor(op: GatewayOpcode, d?: any, s?: number, t?: string);
    send(ws: WebSocket): void;
}
export { GatewayOpcode, Payload };
