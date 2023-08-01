import { Partials, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import CustomClient from "./Handlers/CustomClient.js";
export const client: CustomClient = new CustomClient({intents: 3276799, partials: [Partials.Message |  Partials.Channel | Partials.Reaction | Partials.User]});

export { CommandHandler, GuildCommandHandler } from "./Handlers/CommandHandler.js";
export type CommandBuilder = Omit<SlashCommandSubcommandsOnlyBuilder, "addSubcommand" | "addSubcommandGroup">;
export { default as ButtonHandler } from "./Handlers/ButtonHandler.js";
export { ContextProvider, isContextProviderHandler } from "./Handlers/ContextProvider.js";
