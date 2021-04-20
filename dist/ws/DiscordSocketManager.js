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
// This one is gonna be the socket manager for Discord clients, basing it off of Client.ts
const discordGateway_1 = require("./discordGateway");
const WebSocket = require("ws");
const constants_1 = require("../constants/constants");
class DiscordSocketManager {
    connect(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.socket = new WebSocket(constants_1.discordGatewayURL);
                this.socket.on("open", () => {
                    this.socket.on("message", (data) => __awaiter(this, void 0, void 0, function* () {
                        let jsonData = JSON.parse(data.toString());
                        let payload = new discordGateway_1.Payload(jsonData.op, jsonData.d);
                        switch (payload.jsonObject.op) {
                            case discordGateway_1.GatewayOpcode.HELLO:
                                this.interval = this.heartbeat(payload.jsonObject.d['heartbeat_interval']);
                                yield this.identify(token);
                                break;
                        }
                    }));
                });
            }
            catch (err) {
                console.log(err);
                return (err);
            }
        });
    }
    heartbeat(ms) {
        return setInterval(() => {
            new discordGateway_1.Payload(discordGateway_1.GatewayOpcode.HEARTBEAT).send(this.socket);
        }, ms);
    }
    identify(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let identificationPayload = new discordGateway_1.Payload(discordGateway_1.GatewayOpcode.IDENTIFY, {
                token: token,
                properties: {
                    $os: "linux",
                    $browser: "DisGuild",
                    $device: "DisGuild"
                },
                intents: 513
            });
        });
    }
}
exports.default = DiscordSocketManager;
