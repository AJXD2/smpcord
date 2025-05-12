import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  ClientEvents,
  Client,
  PermissionResolvable,
} from "discord.js";

// Interface for slash commands
export interface Command {
  data:
    | SlashCommandBuilder
    | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
  execute: (interaction: ChatInputCommandInteraction) => Promise<any> | any;
  permissions?: PermissionResolvable[];
  cooldown?: number;
  ephemeral?: boolean;
  componentsV2?: boolean;
}

// Interface for bot events
export interface Event<E extends keyof ClientEvents = keyof ClientEvents> {
  name: E;
  once?: boolean;
  execute: (...args: [...ClientEvents[E], Client]) => Promise<any> | any;
}
