declare enum ClientPlatform {
    Discord = 0,
    Guilded = 1
}
declare class Client {
    private platform;
    private GATEWAY;
    private ws;
    private socketManager;
    private sessionID;
    constructor(platform?: ClientPlatform);
    login(token: string, intents?: number): void;
    private discordLogin;
    private guildedLogin;
}
export { Client, ClientPlatform };
