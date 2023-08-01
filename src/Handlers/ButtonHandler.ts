import {ContextProvider} from "../Exports.js";
import {ButtonInteraction} from "discord.js";

export default abstract class ButtonHandler implements ContextProvider<ButtonInteraction> {
    public context: ButtonInteraction;
    public abstract id: string;
    public abstract execute(): Promise<void>;
}