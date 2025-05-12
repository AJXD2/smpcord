import { Events } from "discord.js";
import type { Event } from "../types";
import { db } from "../db";
import { servers } from "../db/schema";
import { eq } from "drizzle-orm";
const event: Event<Events.GuildDelete> = {
  name: Events.GuildDelete,
  execute: async (guild) => {
    try {
      await db.delete(servers).where(eq(servers.id, guild.id));
    } catch (error) {
      console.error(error);
    }
  },
};

export default event;
