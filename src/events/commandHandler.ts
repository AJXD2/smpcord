import { Events, MessageFlags, TextDisplayBuilder } from "discord.js";
import type { Event } from "../types";

const event: Event<Events.InteractionCreate> = {
  name: Events.InteractionCreate,
  execute: async (interaction, client) => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    const cooldown = client.cooldowns.get(interaction.user.id);

    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      await interaction.reply({
        components: [
          new TextDisplayBuilder({
            content: "There was an error while executing this command!",
          }),
        ],
        flags: MessageFlags.IsComponentsV2,
      });
      return;
    }
    if (cooldown) {
      const timeLeft = cooldown - Date.now();
      if (timeLeft > 0) {
        const seconds = Math.ceil(timeLeft / 1000);
        return interaction.reply({
          content: `Please wait ${seconds} seconds before using this command again.`,
          flags: MessageFlags.Ephemeral,
        });
      }
    }
    await interaction.deferReply({
      flags:
        (command.ephemeral ? MessageFlags.Ephemeral : 0) |
        (command.componentsV2 ? MessageFlags.IsComponentsV2 : 0),
    });
    try {
      // Set cooldown
      client.cooldowns.set(
        interaction.user.id,
        Date.now() + (command.cooldown || 0) * 1000
      );
      // Check permissions
      if (command.permissions) {
        const hasPermission = interaction.memberPermissions?.has(
          command.permissions
        );
        if (!hasPermission) {
          if (command.componentsV2) {
            return interaction.followUp({
              content: "You do not have permission to use this command.",
              components: [
                new TextDisplayBuilder({
                  content: "You do not have permission to use this command.",
                }),
              ],
              flags: MessageFlags.IsComponentsV2,
            });
          }
          return interaction.followUp({
            content: "You do not have permission to use this command.",
            flags: MessageFlags.Ephemeral,
          });
        }
      }
      await command.execute(interaction);
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}:`);
      console.error(error);

      if (command.componentsV2) {
        await interaction.followUp({
          components: [
            new TextDisplayBuilder({
              content: "There was an error while executing this command!",
            }),
          ],
          flags: MessageFlags.IsComponentsV2,
        });
      } else {
        await interaction.followUp({
          content: "There was an error while executing this command!",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  },
};

export default event;
