# SMPCord Discord Bot

A modular, TypeScript-friendly Discord bot using Bun, discord.js, and Zod.

## Features

- TypeScript support with proper interfaces and types
- Modular command and event handling
- Environment variable validation with Zod
- Slash command support
- Automatic command registration based on environment
- Built for performance with Bun

## Prerequisites

- [Bun](https://bun.sh/) installed
- A Discord bot application set up on the [Discord Developer Portal](https://discord.com/developers/applications)

## Setup

1. Clone the repository
   ```
   git clone https://github.com/yourusername/smpcord.git
   cd smpcord
   ```

2. Install dependencies
   ```
   bun install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   BOT_TOKEN=your_discord_bot_token_here
   CLIENT_ID=your_discord_client_id_here
   GUILD_ID=your_discord_guild_id_here  # Optional in production
   MODE=development  # or "production"
   POSTGRES_URL="postgres://smpcord:smpcordpass@localhost:5432/smpcord"
   ```

4. Start the bot:
   ```
   bun run dev
   ```

## Environment Modes

The bot has two operational modes:

- **Development Mode** (`MODE=development`): Commands are registered only to the guild specified in the `GUILD_ID` environment variable. This allows for faster testing as guild commands update instantly.

- **Production Mode** (`MODE=production`): Commands are registered globally to the application. Global commands can take up to an hour to propagate to all guilds but work in all servers where the bot is installed.

## Creating Commands

1. Create a new file in the `src/commands` directory, e.g., `src/commands/example.ts`
2. Use the following template:

```typescript
import { SlashCommandBuilder } from 'discord.js';
import type { Command } from '../types';

const command: Command = {
  data: new SlashCommandBuilder()
    .setName('command-name')
    .setDescription('Command description'),
  
  execute: async (interaction) => {
    // Your command logic here
    await interaction.reply('Response message');
  }
};

export default command;
```

Commands will be automatically registered on bot startup based on the current environment mode.

## Creating Events

1. Create a new file in the `src/events` directory, e.g., `src/events/example.ts`
2. Use the following template:

```typescript
import { Events } from 'discord.js';
import type { Event } from '../types';

const event: Event<Events.EventName> = {
  name: Events.EventName,
  once: false, // Set to true if this should only trigger once
  execute: async (...args) => {
    // Your event logic here
  }
};

export default event;
```

## Development Database (PostgreSQL)

This project uses [Drizzle ORM](https://orm.drizzle.team/) with PostgreSQL. For local development, you can launch a PostgreSQL server using Docker Compose:

```sh
docker-compose up -d
```

This will start a PostgreSQL server accessible at `localhost:5432` with the following credentials:
- **User:** smpcord
- **Password:** smpcordpass
- **Database:** smpcord

### Environment Variable

Add the following to your `.env` file:

```
POSTGRES_URL="postgres://smpcord:smpcordpass@localhost:5432/smpcord"
```

You can now use Drizzle ORM to connect to this database.

## License

MIT
