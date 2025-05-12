import type { Client, ClientEvents } from "discord.js";
import { Collection } from "discord.js";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import type { Command, Event } from "../types";

// Function to load commands
export const loadCommands = async (): Promise<Collection<string, Command>> => {
  const commands = new Collection<string, Command>();
  const commandsPath = join(import.meta.dir, "..", "commands");
  const commandFiles = readdirSync(commandsPath).filter((file) =>
    file.endsWith(".ts")
  );

  for (const file of commandFiles) {
    const filePath = join(commandsPath, file);
    const command = (await import(filePath)).default as Command;

    if ("data" in command && "execute" in command) {
      commands.set(command.data.name, command);
      console.log(`Loaded command: ${command.data.name}`);
    } else {
      console.warn(
        `Command at ${filePath} is missing required "data" or "execute" property.`
      );
    }
  }

  return commands;
};

// Function to register events
export const registerEvents = async (client: Client): Promise<void> => {
  const eventsPath = join(import.meta.dir, "..", "events");
  const eventFiles = readdirSync(eventsPath).filter((file) =>
    file.endsWith(".ts")
  );

  for (const file of eventFiles) {
    const filePath = join(eventsPath, file);
    const event = (await import(filePath)).default as Event<keyof ClientEvents>;

    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }

    console.log(`Registered event: ${event.name}`);
  }
};
