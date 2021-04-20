/// <reference types="node" />
export default class DiscordSocketManager {
    private socket;
    private interval;
    connect(token: string): Promise<any>;
    heartbeat(ms: number): NodeJS.Timeout;
    identify(token: string): Promise<void>;
}
