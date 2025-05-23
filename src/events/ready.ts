import { Events } from "discord.js";
import type { Event } from "../types";

const event: Event<Events.ClientReady> = {
  name: Events.ClientReady,
  once: true,
  execute: (client) => {
    console.log(`Bot is online! Logged in as ${client.user?.tag}`);
  },
};

export default event;
