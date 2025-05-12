import { Client, Collection, Colors, GatewayIntentBits } from "discord.js";
import { env } from "./utils/env";
import { loadCommands, registerEvents } from "./utils/handlers";
import { deployCommands } from "./deploy-commands";
import type { Command } from "./types";

declare module "discord.js" {
  interface Client {
    commands: Collection<string, Command>;
    cooldowns: Collection<string, number>;
  }
}

async function main() {
  try {
    // Create a new client instance
    const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    // Initialize commands collection
    client.commands = new Collection<string, Command>();
    client.cooldowns = new Collection<string, number>();

    // Deploy slash commands based on environment
    console.log(`Running in ${env.MODE} mode`);
    await deployCommands();
    console.log("Commands deployed successfully");

    // Load commands and register events
    client.commands = await loadCommands();
    await registerEvents(client);

    // Login to Discord with the token
    await client.login(env.BOT_TOKEN);
  } catch (error) {
    console.error("Error starting bot:");
    console.error(error);
    process.exit(1);
  }
}

main();
