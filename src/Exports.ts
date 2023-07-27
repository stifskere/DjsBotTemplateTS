import { Partials, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import CustomClient from "./Handlers/CustomClient.js";

export const client: CustomClient = new CustomClient({intents: 3276799, partials: [Partials.Message |  Partials.Channel | Partials.Reaction | Partials.User]});

export { default as CommandHandler } from "./Handlers/CommandHandler.js";
export type CommandBuilder = Omit<SlashCommandSubcommandsOnlyBuilder, "addSubcommand" | "addSubcommandGroup">;