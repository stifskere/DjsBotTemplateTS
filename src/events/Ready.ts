import { Event } from "@handlers/Builders.js";
import { Events } from "discord.js";
import ora, { Ora } from "ora";
import { logger } from "@utils/logger.js";

interface BotLoginData {
	session_start_limit: {
		total: number;
		remaining: number;
	};
}

export default new Event({
	event: Events.ClientReady,

	async handler(): Promise<void> {
		logger.info("✨ \x1b[33mThanks for using DjsBotTemplateTS!\x1b[0m ✨\n");

		const loginTimes: Ora = ora({ text: "... out of ... logins remaining" }).start();
		const loginData: BotLoginData = JSON.parse(
			await (
				await fetch("https://discord.com/api/v10/gateway/bot", {
					headers: { Authorization: `Bot ${process.env.TOKEN!}` }
				})
			).text()
		) as BotLoginData;
		loginTimes.succeed(
			`${loginData.session_start_limit.remaining} out of ${loginData.session_start_limit.total} logins remaining`
		);

		const ping = ora({ text: "gateway ping is ..." }).start();

		while (this.client.ws.ping === -1) {
			await new Promise<void>((resolve): void => {
				setTimeout((): void => {
					if (this.client.ws.ping !== -1)
						ping.succeed(`gateway ping is ${this.client.ws.ping}ms`);
					resolve();
				}, 1000);
			});
		}

		console.log();
	}
});
