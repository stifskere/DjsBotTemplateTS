import {ButtonHandler} from "../Exports.js";

/*
*   This is an example handler for buttons, this component is a class that extends <ButtonHandler>.
*   <ButtonHandler> will ask for id and execute fields implementation, the id is the custom button id
*   and the execute function is what is going to run when the button is clicked, you can access interaction
*   trough this.context
*
*   --------------------------------------------------------------------
*
*   Este es un ejemplo para un administrador de botones, este componente es una clase que extiende <ButtonHandler>.
*   <ButtonHandler> te pedirá que implementes los campos de id y execute, la id es la id personalizada del botón
*   y execute es la función que se ejecutara cuando el botón sea presionado, puedes acceder a la interacción
*   por this.context
*/

export default class DeletePingEmbed extends ButtonHandler {
    id: string = "del_ping_embed";

    async execute(): Promise<void> {
        await this.context.deferReply();
        await this.context.message.delete();
        await this.context.deleteReply();
    }
}