import {Client, ClientOptions, Collection} from "discord.js";
import {CommandHandler} from "../Exports.js";
import botConfig from "../../botConfig.json" assert {type: "json"}
import ora, {Ora} from "ora";

export default class CustomClient extends Client {
    public commands: Collection<string, CommandHandler> = new Collection();
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