// This one is gonna be the socket manager for Discord clients, basing it off of Client.ts
import { GatewayOpcode, Payload } from "./discordGateway";
import * as WebSocket from "ws";
import { discordGatewayURL } from "../constants/constants";

export default class DiscordSocketManager {
    private socket : WebSocket;
    private interval : NodeJS.Timeout;
    async connect (token : string) {
        try {
            this.socket = new WebSocket(discordGatewayURL);
            this.socket.on("open", () => {
                this.socket.on("message", async data => {
                    let jsonData = JSON.parse(data.toString());
                    let payload = new Payload(jsonData.op, jsonData.d);
                    switch (payload.jsonObject.op) {
                        case GatewayOpcode.HELLO:
                            this.interval = this.heartbeat(payload.jsonObject.d['heartbeat_interval']);
                            await this.identify(token);
                            break;
                    }
                })

            });
        } catch (err) {
            console.log(err);
            return(err);
        }
    }
    heartbeat(ms : number) {
        return setInterval(() => {
            new Payload(GatewayOpcode.HEARTBEAT).send(this.socket);
        }, ms);
    }
    async identify (token : string) {
        let identificationPayload = new Payload(GatewayOpcode.IDENTIFY, {
            token: token,
            properties: {
                $os: "linux",
                $browser: "DisGuild",
                $device: "DisGuild"
            },
            intents: 513
        })
    }
}