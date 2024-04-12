import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { glob } from "glob";
import CustomClient from "./modules/CustomClient.js";
import {
	CommandTypes,
	SlashCommand,
	Event,
	ComponentTypes,
	UserCommand
} from "@handlers/Builders.js";
import { ClientEvents, REST, Routes } from "discord.js";
import process from "node:process";
import { logger, notifyError } from "@utils/logger.js";

(await import("dotenv")).config({ path: "./.env" });

const dirName: string = dirname(fileURLToPath(import.meta.url));
const client: CustomClient = new CustomClient();

async function registerFiles<T>(subFolder: string, callback: (imported: T) => void): Promise<void> {
	for (const handler of await glob(join(dirName, subFolder) + "/**/*.js")) {
		// avoid unresolved route in webstorm.
		const moduleName: string = `file://${resolve(handler)}`;
		callback((await import(moduleName)).default);
	}
}

await registerFiles<CommandTypes | ComponentTypes>(
	"commands",
	(imported: CommandTypes | ComponentTypes): void => {
		if (imported instanceof SlashCommand || imported instanceof UserCommand)
			client.commands.push(imported); // these get registered
		else {
			client.components.push(imported); // these don't
		}
	}
);

await new REST()
	.setToken(<string>process.env.TOKEN)
	.put(Routes.applicationCommands(process.env.APPID!), {
		body: client.commands.map((c: CommandTypes) => c.parameters.builder.toJSON())
	});

await registerFiles<Event>("events", (imported: Event): void => {
	function eventWrapper(...params: any[]): void {
		new Promise<void>((resolve, reject) => {
			try {
				const handlerResult: Promise<void> | void = imported.parameters.handler.call(
					imported.context,
					...params
				);

				if (handlerResult instanceof Promise) {
					handlerResult.then(resolve).catch(reject);

					return;
				}

				resolve();
			} catch (error: any) {
				reject(error);
			}
		}).catch((error: Error): void => {
			logger.error(`Error caught in ${imported.parameters.event} event:\n${error}`);
			notifyError(error);
		});
	}

	imported.context = { client };

	client.on(<keyof ClientEvents>imported.parameters.event, eventWrapper);
});

await client.login(process.env.TOKEN);
