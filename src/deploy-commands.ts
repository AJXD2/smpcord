import { REST, Routes } from "discord.js";
import { env } from "./utils/env";
import { loadCommands } from "./utils/handlers";

async function deployCommands() {
  try {
    console.log("Started deploying application commands.");

    const commands = await loadCommands();
    const commandData = Array.from(commands.values()).map((cmd) =>
      cmd.data.toJSON()
    );

    const rest = new REST().setToken(env.BOT_TOKEN);
    let deployedCommands;

    if (env.MODE === "development" && env.GUILD_ID) {
      // Deploy commands to specific guild for development
      deployedCommands = await rest.put(
        Routes.applicationGuildCommands(env.CLIENT_ID, env.GUILD_ID),
        { body: commandData }
      );
      console.log(
        `[DEV MODE] Successfully deployed ${commandData.length} guild commands to guild ${env.GUILD_ID}.`
      );
    } else {
      // Deploy global commands for production
      deployedCommands = await rest.put(
        Routes.applicationCommands(env.CLIENT_ID),
        { body: commandData }
      );
      console.log(
        `[PROD MODE] Successfully deployed ${commandData.length} global commands.`
      );
    }

    return deployedCommands;
  } catch (error) {
    console.error("Error deploying commands:");
    console.error(error);
    throw error;
  }
}

// Check if this file is being executed directly (not imported)
const isMainModule = import.meta.url.endsWith(process.argv[1]);
if (isMainModule) {
  deployCommands()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

export { deployCommands };
