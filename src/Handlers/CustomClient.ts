import {Client, ClientOptions, Collection, Snowflake} from "discord.js";
import {ButtonHandler, CommandHandler, GuildCommandHandler} from "../Exports.js";
import botConfig from "../../botConfig.json" assert {type: "json"}
import ora, {Ora} from "ora";

interface BotLoginData {
    url: string;
    shards: number;
    session_start_limit: {
        total: number;
        remaining: number;
        reset_after: number;
        max_concurrency: number;
    }
}

export default class CustomClient extends Client {
    public commands: Collection<string, CommandHandler> = new Collection();
    public guildCommands: Collection<Snowflake, Collection<string, GuildCommandHandler>> = new Collection();
    public buttonHandlers: Array<ButtonHandler> = [];

    private splashGenerator: AsyncGenerator<void> = this.splashScreen();

    constructor(options: ClientOptions) {
        super(options);

        this.on("ready", async (): Promise<void> => {
            await this.splashGenerator.next();
        });

        (async (): Promise<any> => await this.splashGenerator.next())();
    }

    private async *splashScreen(): AsyncGenerator<void> {
        let loadingMessage: Ora;
        const beforeDate: number = Date.now();

        if (botConfig.credits)
            console.log("✨ \x1b[33mThanks for using DjsBotTemplateTS!\x1b[0m ✨\n");

        if (botConfig.splash)
            loadingMessage = ora({text: "Client is starting..."}).start();

        yield;

        loadingMessage?.succeed("Client started!");

        if (botConfig.splash) {
            loadingMessage?.succeed(`started in ${(Date.now() - beforeDate) / 1000}s`);

            loadingMessage = ora({text: "... out of ... logins remaining."}).start();
            const loginData: BotLoginData = JSON.parse(await (await fetch("https://discord.com/api/v10/gateway/bot", {headers: {Authorization: `Bot ${process.env.TOKEN!}`}})).text()) as BotLoginData;
            loadingMessage.succeed(`${loginData.session_start_limit.remaining} out of ${loginData.session_start_limit.total} logins remaining`);

            loadingMessage = ora({text: "webSocket ping is..."}).start();
        }

        if (this.ws.ping !== -1) {
            loadingMessage.succeed(`webSocket ping is ${this.ws.ping}`);
            return;
        }

        while (this.ws.ping === -1) {
            await new Promise<void>((resolve): void => {
                setTimeout((): void => {
                    if (this.ws.ping !== -1)
                        loadingMessage.succeed(`webSocket ping is ${this.ws.ping}ms`);
                    resolve();
                }, 5000);
            });
        }

        console.log();
    }
}