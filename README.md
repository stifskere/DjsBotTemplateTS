# Discord.JS template for typescript

This is a template for a discord bot that includes its own command and event handler,
basically the base discord.js functions are implemented, so you don't need to do that.

This only implements a command handler and an event handler.

## Getting started

To get started, create a copy of the repository template, then you may clone the copy repository.

![img.png](external/clone.png)

then you may clone it using the following command

```bash
git clone https://github.com/$your_user_name/$your_repo_name
cd $your_repo_name
```

and then open it with your favorite editor

```bash
# whether is vscode
code .
# or webstorm
webstorm .
```

Before touching any code, you should install all the dependencies for this bot.

```bash
npm install
```

after running this command you can see that a file named `.env` has been created, you may fill it now.

```dotenv
# you can get these values in https://discord.dev

TOKEN="" # your discord bot token should go here.
APPID="" # your discord application id should go here.
```

**THIS FILE SHOULD NEVER BE PUSHED TO YOUR GITHUB REPOSITORY** thus it's added in the `.gitignore`.

## Starting the bot

npm scripts are configured in this repository `package.json`, you may run the following.

```bash
npm run start
```

if your `.env` file is correctly set, you should have a `/ping` command available.

## Adding implementations

to add commands and events I left 2 comments

- The first one is in the `Ping.ts` file for the command implementations
- The second one is in the `ready.ts` file for the event implementations

I recommend you to read that to know how to implement commands, otherwise you can just read the code and see how it works by yourself.

### Bot configuration

for the bot configuration there is a json in the root called `botConfig.json` which has 2 fields

```json
    {
      "credits": true,
      "splash": true,
      "paths": {
        "events": "Events",
        "commands": "Commands",
        "buttons": "Buttons"
      }
    }
```

- the `credits` option is for the `Thanks for using DjsBotTemplateTS!` text at the start.
- the `splash` option is to automatically show when the client is started, the time and the websocket ping.
- the `paths` option has its defaults, and is where the bot is going to find each category starting from the `src` folder.