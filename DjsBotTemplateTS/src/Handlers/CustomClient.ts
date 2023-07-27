import { Client, Collection } from "discord.js";
import { CommandHandler } from "../Exports.js";

export default class CustomClient extends Client {
    public commands: Collection<string, CommandHandler> = new Collection();
}