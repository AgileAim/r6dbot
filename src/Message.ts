import * as Discord from "discord.js";
import * as minimist from "minimist";
import { ROOTADMIN } from "./constants";

export default class Message {
    id: string;
    author: Discord.User;
    guild: Discord.Guild;
    channel: Discord.Channel;
    isMe: boolean;
    isCommand: boolean;
    isAuthenticated: boolean;

    mentions: Discord.MessageMentions;
    content: string[];
    command: string;
    params: minimist.ParsedArgs;
    raw: any;

    constructor(message: Discord.Message) {

        const cleaned = message.content.split(' ').map(x => x.trim()).filter(x => /^<@\d+>$/.test(x) === false);

        this.id = message.id;
        this.author = message.author;
        this.channel = message.channel;
        this.guild = message.guild;

        this.isMe = this.author.id === process.env.DISCORD_CLIENTID;
        this.isCommand = message.mentions.users.has(process.env.DISCORD_CLIENTID);
        this.isAuthenticated = ROOTADMIN.findIndex(x => x === message.author.id) !== -1;

        this.mentions = message.mentions;
        this.content = cleaned;
        this.command = this.isCommand ? cleaned[0]: null;
        this.params = this.isCommand ? minimist(cleaned.slice(1)) : null;
        this.raw = message;
    }

    toString() {
        return `${ this.author.username }#${ this.author.discriminator }(${ this.author.id }): ${ this.content.join(' ') }`;
    }
};
