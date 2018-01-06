import { config } from "dotenv";
config();

import * as debug from "debug";
import * as Discord from "discord.js";
import Message from "./Message";
import commands from "./commands";
const client = new Discord.Client();




const dbg = debug("r6dbot");

client.on('ready', () => {
    dbg("bot ready");
});

client.on('message', message => {
    const msg = new Message(message);
    dbg("new message", msg.toString());
    if (msg.isCommand) {
        dbg("command", msg.command);
        if (commands.has(msg.command)) {
            const command = commands.get(msg.command);
            command(msg.params, message);
        } else {
            message.reply("sorry, i do not recognize that command");
        }
    }
});

client.login(process.env.DISCORD_TOKEN);
