import { z } from "zod";
import { config } from "dotenv";

// Load environment variables from .env file
config();

// Define environment schema with Zod
const envSchema = z.object({
  BOT_TOKEN: z.string().min(1, "BOT_TOKEN is required"),
  CLIENT_ID: z.string().min(1, "CLIENT_ID is required"),
  GUILD_ID: z.string().optional(),
  MODE: z.enum(["development", "production"]).default("production"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
});

// Parse and validate environment variables
export const env = envSchema.parse(process.env);

// Type for environment variables
export type EnvVars = z.infer<typeof envSchema>;
