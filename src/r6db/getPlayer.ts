import axios from "../axios";

export default async function getPlayer(id: string) {
    const res = await axios.get(`/players/${id}`);
    if (res.status !== 200) {
        throw new Error(res.data);
    }
    const player = res.data;

    const profilePic = player.platform.toUpperCase() === "PC"
        ? `https://ubisoft-avatars.akamaized.net/${player.id}/default_146_146.png`
        : `https://uplay-avatars.s3.amazonaws.com/${player.userId}/default_146_146.png`;

    const name = player.aliases.sort((a: any, b: any) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0].name;

    return {
        name,
        profilePic,
        stats: player.stats,
        rank: player.rank,
        placements: player.placements,
        lastPlayed: player.lastPlayed
    }
}