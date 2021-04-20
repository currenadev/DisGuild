"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payload = exports.GatewayOpcode = void 0;
var GatewayOpcode;
(function (GatewayOpcode) {
    GatewayOpcode[GatewayOpcode["DISPATCH"] = 0] = "DISPATCH";
    GatewayOpcode[GatewayOpcode["HEARTBEAT"] = 1] = "HEARTBEAT";
    GatewayOpcode[GatewayOpcode["IDENTIFY"] = 2] = "IDENTIFY";
    GatewayOpcode[GatewayOpcode["PRESENCE_UPDATE"] = 3] = "PRESENCE_UPDATE";
    GatewayOpcode[GatewayOpcode["VOICE_STATUS_UPDATE"] = 4] = "VOICE_STATUS_UPDATE";
    GatewayOpcode[GatewayOpcode["RESUME"] = 6] = "RESUME";
    GatewayOpcode[GatewayOpcode["RECONNECT"] = 7] = "RECONNECT";
    GatewayOpcode[GatewayOpcode["REQUEST_GUILD_MEMBERS"] = 8] = "REQUEST_GUILD_MEMBERS";
    GatewayOpcode[GatewayOpcode["INVALID_SESSION"] = 9] = "INVALID_SESSION";
    GatewayOpcode[GatewayOpcode["HELLO"] = 10] = "HELLO";
    GatewayOpcode[GatewayOpcode["HEARTBEAT_ACK"] = 11] = "HEARTBEAT_ACK";
})(GatewayOpcode || (GatewayOpcode = {}));
exports.GatewayOpcode = GatewayOpcode;
;
class Payload {
    constructor(op, d, s, t) {
        this.jsonObject = {
            op: op
        };
        if (d)
            this.jsonObject.d = d;
        if (s)
            this.jsonObject.s = s;
        if (t)
            this.jsonObject.t = t;
    }
    send(ws) {
        ws.send(JSON.stringify(this.jsonObject));
    }
}
exports.Payload = Payload;
