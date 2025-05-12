import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";

// --- Enums ---

export const announcementColorEnum = pgEnum("announcement_color", [
  "Default",
  "White",
  "Aqua",
  "Green",
  "Blue",
  "Yellow",
  "Purple",
  "LuminousVividPink",
  "Fuchsia",
  "Gold",
  "Orange",
  "Red",
  "Grey",
  "Navy",
  "DarkAqua",
  "DarkGreen",
  "DarkBlue",
  "DarkPurple",
  "DarkVividPink",
  "DarkGold",
  "DarkOrange",
  "DarkRed",
  "DarkGrey",
  "DarkerGrey",
  "LightGrey",
  "DarkNavy",
  "Blurple",
  "Greyple",
  "DarkButNotBlack",
  "NotQuiteBlack",
]);
export const ticketStatusEnum = pgEnum("ticket_status", [
  "open",
  "closed",
  "pending",
  "resolved",
]);
export const suggestionStatusEnum = pgEnum("suggestion_status", [
  "pending",
  "approved",
  "rejected",
]);
const timestamps = {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

// --- Servers (Guilds) ---
export const servers = pgTable("servers", {
  id: varchar("id", { length: 32 }).primaryKey(), // Discord guild ID
  name: text("name").notNull(),
  statusChannelId: varchar("status_channel_id", { length: 32 }),
  unjoinableVoiceChannelId: varchar("unjoinable_voice_channel_id", {
    length: 32,
  }),
  announcementChannelId: varchar("announcement_channel_id", { length: 32 }),
  suggestionChannelId: varchar("suggestion_channel_id", { length: 32 }),
  ticketChannelId: varchar("ticket_channel_id", { length: 32 }),
  ...timestamps,
});

// --- Announcements ---
export const announcements = pgTable("announcements", {
  id: serial("id").primaryKey(),
  serverId: varchar("server_id", { length: 32 })
    .notNull()
    .references(() => servers.id, { onDelete: "cascade" }),
  authorId: varchar("author_id", { length: 32 }).notNull(),
  title: text("title"),
  description: text("description"),
  color: announcementColorEnum("color").default("Blurple"),
  imageUrl: text("image_url"),
  roleMention: varchar("role_mention", { length: 32 }),
  scheduledFor: timestamp("scheduled_for"),
  ...timestamps,
});

// --- Suggestions ---
export const suggestions = pgTable("suggestions", {
  id: serial("id").primaryKey(),
  serverId: varchar("server_id", { length: 32 })
    .notNull()
    .references(() => servers.id, { onDelete: "cascade" }),
  authorId: varchar("author_id", { length: 32 }).notNull(),
  content: text("content").notNull(),
  status: suggestionStatusEnum("status").default("pending"),
  ...timestamps,
});

// --- Tickets ---
export const tickets = pgTable("tickets", {
  id: serial("id").primaryKey(),
  serverId: varchar("server_id", { length: 32 })
    .notNull()
    .references(() => servers.id, { onDelete: "cascade" }),
  authorId: varchar("author_id", { length: 32 }).notNull(),
  status: ticketStatusEnum("status").default("open"),
  subject: text("subject"),
  description: text("description"),
  ...timestamps,
  closedAt: timestamp("closed_at"),
});

// --- Minecraft Server Status/Config ---
export const mcServerStatus = pgTable("mc_server_status", {
  id: serial("id").primaryKey(),
  serverId: varchar("server_id", { length: 32 })
    .notNull()
    .references(() => servers.id, { onDelete: "cascade" }),
  status: text("status").notNull(), // online/offline
  playerCount: integer("player_count").notNull().default(0),
  lastChecked: timestamp("last_checked").notNull().defaultNow(),
  ...timestamps,
});
