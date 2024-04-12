import { Events, Interaction, SlashCommandBuilder } from "discord.js";
import {
	BaseContext,
	ButtonContext,
	CommandContext,
	EventContext,
	SelectMenuContext
} from "./Context.js";

export interface BaseParameters<TThis extends BaseContext> {
	handler: (this: TThis, ...params: any[]) => Promise<void> | void;
}

export type CommandParameters<TInteraction extends Interaction> = {
	builder: SlashCommandBuilder;
} & BaseParameters<CommandContext<TInteraction>>;

export type EventParameters = {
	event: Events;
} & BaseParameters<EventContext>;

export type ComponentParameters<TInteraction extends ButtonContext | SelectMenuContext> = {
	componentId: string;
} & BaseParameters<TInteraction>;
