
/*
*   This is an example event for the implementation explanation.
*   To implement an event you just need to export a function that returns Promise<void>.
*
*   The event name is the same as the file name, so the file name should be lowercase.
*
*   This example implementation is for the ready event.
*
*   ---------------------------------------------------------------
*
*   Esto es un evento de ejemplo para la explicación de la implementación.
*   Para implementar un evento simplemente has de exportar una función que retorne Promise<void>.
*
*   El nombre del evento es el mismo que el nombre del archivo, asi que el nombre del archivo debería estar en minúsculas.
*
*   Esta implementación de ejemplo es para el evento de ready.
*/

export default async function(): Promise<void> {
    console.log("The bot is ready!");
}