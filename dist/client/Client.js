"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientPlatform = exports.Client = void 0;
const constants_1 = require("../constants/constants");
const WebSocket = require("ws");
const discordGateway_1 = require("../ws/discordGateway");
const DiscordSocketManager_1 = require("../ws/DiscordSocketManager");
var ClientPlatform;
(function (ClientPlatform) {
    ClientPlatform[ClientPlatform["Discord"] = 0] = "Discord";
    ClientPlatform[ClientPlatform["Guilded"] = 1] = "Guilded";
})(ClientPlatform || (ClientPlatform = {}));
exports.ClientPlatform = ClientPlatform;
class Client {
    constructor(platform = ClientPlatform.Discord) {
        this.sessionID = "";
        this.platform = platform;
        this.GATEWAY = this.platform == ClientPlatform.Discord ? constants_1.discordGatewayURL : constants_1.guildedGatewayURL;
    }
    login(token, intents = 513) {
        switch (this.platform) {
            case ClientPlatform.Discord:
                this.socketManager = new DiscordSocketManager_1.default();
                // this.discordLogin(token, intents);
                break;
            case ClientPlatform.Guilded:
                this.guildedLogin(token);
                break;
        }
    }
    discordLogin(token, intents) {
        return __awaiter(this, void 0, void 0, function* () {
            this.ws = new WebSocket(this.GATEWAY);
            this.ws.on("open", () => {
                this.ws.on("message", (data) => {
                    let jsonData = JSON.parse(data.toString());
                    let payload = new discordGateway_1.Payload(jsonData.op, jsonData.d);
                    switch (payload.jsonObject.op) {
                        case discordGateway_1.GatewayOpcode.HELLO:
                            const heartbeatInterval = payload.jsonObject.d['heartbeat_interval'];
                            setInterval(() => {
                                new discordGateway_1.Payload(discordGateway_1.GatewayOpcode.HEARTBEAT).send(this.ws);
                            }, heartbeatInterval);
                            let properties = { $os: "linux", $browser: "DisGuild", $device: "DisGuild" };
                            let identificationPayload = new discordGateway_1.Payload(discordGateway_1.GatewayOpcode.IDENTIFY, { token, properties, intents });
                            identificationPayload.send(this.ws);
                            break;
                        case discordGateway_1.GatewayOpcode.DISPATCH:
                            this.sessionID = payload.jsonObject.d['session_id'];
                    }
                    console.log(payload);
                });
            });
            this.ws.on("close", (code, reason) => {
                console.log(code, reason);
            });
        });
    }
    guildedLogin(token) {
        return null;
    }
}
exports.Client = Client;
