import { ChatInputCommandInteraction } from "discord.js";
import { CommandBuilder } from "../Exports.js";

export default abstract class CommandHandler {
    public context: ChatInputCommandInteraction;

    public abstract data: CommandBuilder;
    public abstract execute(): Promise<void>;
}