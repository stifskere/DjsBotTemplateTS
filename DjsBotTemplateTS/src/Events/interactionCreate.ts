import {ChatInputCommandInteraction, Interaction} from "discord.js";
import {client, CommandHandler} from "../Exports.js";

export default async function (interaction: Interaction): Promise<void> {
    if (!(interaction instanceof ChatInputCommandInteraction))
        return;

    const handler: CommandHandler = client.commands.get(interaction.commandName);
    handler.context = interaction;
    await handler.execute();
}