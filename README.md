# Discord.JS template for typescript

This is a template for a discord bot that includes its own command and event handler,
basically the base discord.js functions are implemented, so you don't need to do that.

This only implements a command handler and an event handler.

### Getting started

to get started you shall clone the repository using the following command

```bash
    git clone https://github.com/stifskere/DjsBotTemplateTS.git
```

and then just move to the root of the project by using

```bash
    cd DjsBotTemplateTS
```

create a .Env file in the root by using

```bash
    echo "" > ".Env"
```

and add the following variables to it

```dotenv
TOKEN=YOURBOTTOKEN
APPID=YOURBOTID
```

you can get the bot ID by right-clicking the bot user and copy the id, it should be the last option

### Starting the bot

run the following command

```bash
    npm run start
```

and if the variables are set correctly your bot now should have a command which is `ping`

### Adding implementations

to add commands and events I left 2 comments

- The first one is in the `Ping.ts` file for the command implementations
- The second one is in the `ready.ts` file for the event implementations

I recommend you to read that to know how to implement commands, otherwise you can just read the code and see how it works by yourself.