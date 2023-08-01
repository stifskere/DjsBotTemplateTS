import {ButtonInteraction, ChatInputCommandInteraction, Interaction} from "discord.js";
import {ButtonHandler, client, ContextProvider} from "../Exports.js";

export default async function (interaction: Interaction): Promise<void> {
    const handler: ContextProvider<ButtonInteraction | ChatInputCommandInteraction> = interaction instanceof ChatInputCommandInteraction ? (client.commands.get(interaction.commandName)
        || client.guildCommands.get(interaction.guild.id).get(interaction.commandName)) : client.buttonHandlers.find((h: ButtonHandler): boolean => h.id === (interaction as ButtonInteraction).customId);
    handler.context = (interaction as ButtonInteraction | ChatInputCommandInteraction);
    await handler.execute();
}