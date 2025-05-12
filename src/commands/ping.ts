import {
  MessageFlags,
  PermissionsBitField,
  SlashCommandBuilder,
  TextDisplayBuilder,
} from "discord.js";
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
      flags: MessageFlags.IsComponentsV2,
      components: [
        new TextDisplayBuilder({
          content: "Pinging...",
        }),
      ],
    });
    const latency = sent.createdTimestamp - interaction.createdTimestamp;

    await interaction.editReply({
      flags: MessageFlags.IsComponentsV2,
      components: [
        new TextDisplayBuilder({
          content: `Pong! Bot latency: ${latency}ms | API Latency: ${interaction.client.ws.ping}ms`,
        }),
      ],
    });
  },
};

export default command;
