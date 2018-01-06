import * as minimist from "minimist";
import * as Discord from "discord.js";

import ping from "./ping";
import ban from "./ban";

export interface ICommand {
    command: string;
    callback: (params: minimist.ParsedArgs, message: Discord.Message) => any;
}

const commandMap = new Map<string, ICommand["callback"]>();

commandMap.set("ping", ping);
commandMap.set("ban", ban);

export default commandMap;