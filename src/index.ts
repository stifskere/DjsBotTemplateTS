import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "url";
import {Collection, REST, RESTPostAPIChatInputApplicationCommandsJSONBody as CommandJsonBody, Routes} from "discord.js";

import {CommandHandler, client, GuildCommandHandler, isContextProviderHandler, ButtonHandler} from "./Exports.js";

import botConfig from "../botConfig.json" assert {type: "json"};

const __path: string = path.dirname(fileURLToPath(import.meta.url));

function getFilesRecursively(folderPath: string): Array<string> {
    const files: Array<string> = [];
    for (const item of fs.readdirSync(folderPath)) {
        if (fs.statSync(path.join(folderPath, item)).isDirectory()) files.push(...getFilesRecursively(path.join(folderPath, item)));
        else files.push(path.join(folderPath, item));
    }
    return files;
}

const getPaths: (p: string) => Array<string> = (p) => getFilesRecursively(path.resolve(__path, p)).filter((e: string): boolean => e.endsWith(".js"));

(await import("dotenv")).config({path: getFilesRecursively(path.resolve(__path, "../")).find((v: string): boolean => v.toLowerCase().endsWith(".env"))});

for (const event of getPaths(botConfig.paths.events)) {
    const eventArr: Array<string> = event.split(/[\\\/]/gmi);
    client.on(eventArr[eventArr.length - 1].substring(0, eventArr[eventArr.length - 1].length - 3), async (...args: any): Promise<any> => await (await import(`file:///${event}`)).default(...args));
}

const ImportConstructor: (p: string) => Promise<any> = async (p: string) => (await import(`file:///${p.replace(/\.ts$/gmi, ".js")}`)).default;

for (const commandIteration of getPaths(botConfig.paths.commands)) {
    const command: any = new (await ImportConstructor(commandIteration))();

    if (isContextProviderHandler<GuildCommandHandler | CommandHandler>(command))
        ((command instanceof GuildCommandHandler ? client.guildCommands.get(command.guildId) || client.guildCommands.set(command.guildId, new Collection())
            : client.commands) as Collection<string, GuildCommandHandler | CommandHandler>).set(((command as unknown) as CommandHandler).data.name, ((command as unknown) as CommandHandler));
}

for (const buttonIteration of getPaths(botConfig.paths.buttons)) {
    const buttonHandler: any = new (await ImportConstructor(buttonIteration))();

    if (buttonHandler instanceof ButtonHandler)
        client.buttonHandlers.push(buttonHandler);
}

const commandRest: REST = new REST({version: "10"}).setToken(process.env.TOKEN!);
await commandRest.put(Routes.applicationCommands(process.env.APPID!), {body: client.commands.map((c: CommandHandler): CommandJsonBody => c.data.toJSON())});

for (const guild of client.guildCommands.values())
    await commandRest.put(Routes.applicationCommands(process.env.APPID!), {body: guild.map((c: GuildCommandHandler): CommandJsonBody => c.data.toJSON())})

await client.login(process.env.TOKEN);