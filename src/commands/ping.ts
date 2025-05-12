import { PermissionsBitField, SlashCommandBuilder } from "discord.js";
import type { Command } from "../types";

const command: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with the bot latency"),
  cooldown: 5,
  permissions: [PermissionsBitField.Flags.Administrator],
  ephemeral: true,
  execute: async (interaction) => {
    const sent = await interaction.editReply({
      content: "Pinging...",
    });
    const latency = sent.createdTimestamp - interaction.createdTimestamp;

    await interaction.editReply({
      content: `Pong! Bot latency: ${latency}ms | API Latency: ${interaction.client.ws.ping}ms`,
    });
  },
};

export default command;
