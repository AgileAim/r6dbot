import { ParsedArgs } from "minimist";
import { Message } from "discord.js";
import { ID_REGEX } from "../constants";
import getPlayer from "../r6db/getPlayer";

export default async function (args: ParsedArgs, message: Message) {
    if (!args.reason) {
        return message.reply("you're missing a reason");
    }
    if (!Array.isArray(args.evidence) || args.evidence.length < 2) {
        return message.reply("not enough evidence provided")
    }
    const id = args._[0];
    if (ID_REGEX.test(id) === false) {
        return message.reply(`the id '${id}' is not valid`);
    }
    try {
        const player = await getPlayer(id);
        const msg = [`banning ${player.name} (global #${player.placements.global}) because of: ${args.reason}
due to the following evidence:
${args.evidence.join("\n")}`,
        `\`\`\`
${JSON.stringify(args, null, 2)}
        \`\`\``];

        message.reply(msg);
    } catch (e) {
        console.error(e);
    }
    return undefined;
};