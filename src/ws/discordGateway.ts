import * as WebSocket from "ws";

enum GatewayOpcode {
    DISPATCH = 0,
    HEARTBEAT,
    IDENTIFY,
    PRESENCE_UPDATE,
    VOICE_STATUS_UPDATE,
    RESUME = 6,
    RECONNECT,
    REQUEST_GUILD_MEMBERS,
    INVALID_SESSION,
    HELLO,
    HEARTBEAT_ACK
};
type payloadJSONObject = {
    op : GatewayOpcode;
    d? : any;
    s? : number;
    t? : string;
}

class Payload {
    jsonObject : payloadJSONObject;
    constructor (op : GatewayOpcode, d? : any, s? : number, t? : string) {
        this.jsonObject = {
            op: op
        };
        if (d) this.jsonObject.d = d;
        if (s) this.jsonObject.s = s;
        if (t) this.jsonObject.t = t;
    }
    public send (ws : WebSocket) {
        ws.send(JSON.stringify(this.jsonObject));
    }
}

export { GatewayOpcode, Payload };
