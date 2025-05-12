import { Events } from "discord.js";
import type { Event } from "../types";
import { db } from "../db";
import { servers } from "../db/schema";
const event: Event<Events.GuildCreate> = {
  name: Events.GuildCreate,
  execute: async (guild) => {
    // Initialize the guild in the db
    try {
      await db.insert(servers).values({
        id: guild.id,
        name: guild.name,
      });
    } catch (error) {
      console.error(error);
    }
  },
};

export default event;
