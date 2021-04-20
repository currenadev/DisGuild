import { discordGatewayURL, guildedGatewayURL } from "../constants/constants";
import * as WebSocket from "ws";
import { Payload, GatewayOpcode } from "../ws/discordGateway";
import DiscordSocketManager from "../ws/DiscordSocketManager";
enum ClientPlatform {
    Discord,
    Guilded
}
class Client {
    private platform : ClientPlatform;
    private GATEWAY : string;
    private ws : WebSocket;
    private socketManager : DiscordSocketManager;
    private sessionID : string = "";
    constructor(platform : ClientPlatform = ClientPlatform.Discord) {
        this.platform = platform;
        this.GATEWAY = this.platform == ClientPlatform.Discord ? discordGatewayURL : guildedGatewayURL;
    }
    public login(token : string, intents = 513) {
        switch (this.platform) {
            case ClientPlatform.Discord:
                this.socketManager = new DiscordSocketManager();
                // this.discordLogin(token, intents);
                break;
            case ClientPlatform.Guilded:
                this.guildedLogin(token);
                break;
        }
    }



    private async discordLogin (token : string, intents : number) {
        this.ws = new WebSocket(this.GATEWAY);
        this.ws.on("open", ()=> {
            this.ws.on("message", (data) => {
                let jsonData = JSON.parse(data.toString());
                let payload = new Payload(jsonData.op, jsonData.d);

                
                switch (payload.jsonObject.op) {
                    case GatewayOpcode.HELLO:
                        const heartbeatInterval : number = payload.jsonObject.d['heartbeat_interval'];
                        setInterval(() => {
                            new Payload(GatewayOpcode.HEARTBEAT).send(this.ws);
                        }, heartbeatInterval);
                        let properties = { $os: "linux", $browser: "DisGuild", $device: "DisGuild"};
                        let identificationPayload = new Payload(GatewayOpcode.IDENTIFY, {token, properties, intents});
                        identificationPayload.send(this.ws);
                        break;
                    case GatewayOpcode.DISPATCH:
                        this.sessionID = payload.jsonObject.d['session_id'];
                }
                console.log(payload);
            });
        });
        this.ws.on("close", (code, reason) => {
            console.log(code, reason);
        });

    }
    private guildedLogin (token : string) {
        return null;
    }
}


export {Client, ClientPlatform};