import {client, CommandBuilder, CommandHandler} from "../Exports.js";
import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ComponentType,
    EmbedBuilder,
    SlashCommandBuilder
} from "discord.js";

/*
*   This is a demonstration command for command implementations.
*
*   To create a new command just create a class that extends <CommandHandler>,
*   <CommandHandler> is an abstract class, it will require you to implement data and execute(),
*   data being the command definition and execute the handler. For the interaction context the class
*   has a field named context you can access it using this.context
*
*   You can also extend <GuildCommandHandler> instead of <CommandHandler>, if you want the command
*   to be registered for a single guild.
*
*   The example command implementation is a ping command.
*
*   ------------------------------------------------------------------
*
*   Esto es una demostración de un comando para la implementación
*
*   Para crear un nuevo comando simplemente cree una clase que extienda <CommandHandler>,
*   <CommandHandler> es una clase abstracta, requerirá que implementes data y execute(),
*   data es la definición del comando en si y execute es la función que se ejecutara
*   cuando un usuario mande una solicitud para ejecutar el comando. Para el contexto de la interacción
*   hay un campo en la clase llamado context al que puede acceder usando this.context.
*
*   También puedes extender <GuildCommandHandler> en vez de <CommandHandler>, si quieres que el comando
*   sea solo registrado en un solo servidor.
*
*   La implementación de ejemplo es un comando de ping.
*/

export default class Ping extends CommandHandler {
    data: CommandBuilder = new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Check the bot current ping at the current time.");

    async execute(): Promise<void> {
        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle("🏓 Bot ping")
            .setDescription(`The current client latency is ${client.ws.ping}ms`)
            .setFooter({ text: "Pong!" })
            .setTimestamp()
            .setColor(client.ws.ping < 100 ? 0x00FF00 : (client.ws.ping < 150 ? 0xFFFF00 : 0xFF0000));

        const row: ActionRowBuilder<ButtonBuilder> = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(new ButtonBuilder({type: ComponentType.Button, style: ButtonStyle.Danger, label: "delete embed", custom_id: "del_ping_embed"}))

        await this.context.reply({ embeds: [embed], components: [row] });
    }
}