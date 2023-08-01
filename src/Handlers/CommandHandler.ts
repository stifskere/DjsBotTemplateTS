import {ButtonInteraction, ChatInputCommandInteraction, Snowflake} from "discord.js";
import {CommandBuilder, ContextProvider} from "../Exports.js";

export abstract class CommandHandler implements ContextProvider<ChatInputCommandInteraction>{
    public context: ChatInputCommandInteraction;
    public abstract data: CommandBuilder;
    public abstract execute(): Promise<void>;
}

export abstract class GuildCommandHandler extends CommandHandler {
    public abstract guildId: Snowflake;
}