# 📝 SMPcord TODO List

A clear, actionable roadmap for the Minecraft Discord bot project. Each section contains specific, testable tasks and implementation notes.

---

## 🏁 Priorities & Milestones
- [ ] **MVP:**
  - [ ] Status channel (Minecraft server status)
  - [ ] Announcement command
- [ ] **v1.0:**
  - [ ] All core features
  - [ ] Database persistence
  - [ ] Basic documentation
- [ ] **v2.0+:**
  - [ ] Advanced features
  - [ ] Polish & community feedback

---

## 1. 🏗️ Core Infrastructure
- [x] Project setup (Bun, TypeScript, Discord.js, Zod)
- [x] Environment variable validation
- [x] Docker Compose for PostgreSQL
- [x] Drizzle ORM integration
- [x] **Command & Event Handler Enhancements**
  - [x] Add command permission checks
  - [x] Add command cooldowns

---

## 2. 🟢 Minecraft Server Status Integration
- [ ] **Status Text Channel**
  - [ ] Poll Minecraft server for status (online/offline, player count)
  - [ ] Post regular updates in a designated text channel
  - [ ] Allow server owners to configure update interval
- [ ] **Unjoinable Voice Channel**
  - [ ] Create a voice channel that cannot be joined
  - [ ] Dynamically update channel name to reflect server status/player count
  - [ ] Handle channel recreation if deleted
- [ ] **Implementation Notes:**
  - [ ] Use `minecraft-server-util` or similar for server queries
  - [ ] Store channel IDs and config in the database

---

## 3. 📢 Announcement System
- [ ] **/announcement Command**
  - [ ] Slash command for staff to create announcements
  - [ ] Options: title, description, color, image, role mention
  - [ ] Post as an embed in a chosen channel
  - [ ] Permission checks (staff only)
  - [ ] Log announcements in the database
  - [ ] (Optional) Allow scheduling future announcements
- [ ] **Implementation Notes:**
  - [ ] Use Discord embeds for rich formatting
  - [ ] Consider Components V2 for advanced UI

---

## 4. 👤 Player Management
- [ ] **Whitelist/Blacklist Commands**
  - [ ] Add/remove players from server whitelist/blacklist via Discord
  - [ ] Sync with Minecraft server (via RCON or plugin API)
- [ ] **Join/Leave Notifications**
  - [ ] Post messages in Discord when players join/leave the server
- [ ] **Implementation Notes:**
  - [ ] Secure communication with the Minecraft server
  - [ ] Store player Discord/Minecraft links in the database

---

## 5. ✨ Quality of Life Features
- [ ] **Suggestion Box**
  - [ ] `/suggest` command for player suggestions
  - [ ] Post suggestions in a channel for voting
- [ ] **Ticket System**
  - [ ] Allow users to open support tickets
  - [ ] Staff can manage/close tickets in Discord
- [ ] **Event Scheduler**
  - [ ] Schedule in-game events and post reminders
- [ ] **MOTD/Rules Display**
  - [ ] Commands to display server MOTD or rules

---

## 6. 🗄️ Database & Persistence
- [x] **Schema Design**
  - [x] Servers table (guild/server config)
  - [x] Players table (Discord/Minecraft links)
  - [x] Announcements table
  - [x] Suggestions, tickets, events tables
- [x] **Migrations**
  - [x] Use Drizzle Kit for schema migrations
- [ ] **Backups**
  - [ ] Implement regular database backup strategy

---

## 7. 🧪 Testing & Deployment
- [ ] **CI/CD**
  - [ ] Set up GitHub Actions (or similar) for linting, testing, deployment
- [ ] **Dockerization**
  - [ ] Dockerfile for bot deployment
  - [ ] Docker Compose for full stack (bot + db)

---

## 8. 📚 Documentation
- [ ] **User Guide**
  - [ ] Setup instructions for server owners
  - [ ] Command reference
- [ ] **Developer Guide**
  - [ ] Contribution guidelines
  - [ ] Codebase structure
  - [ ] API documentation

---

## ✅ Completed
- [x] Project setup
- [x] Environment variable validation
- [x] Docker Compose for PostgreSQL
- [x] Drizzle ORM integration
- [x] Command cooldowns
- [x] Database schema design
- [x] Drizzle Kit migrations 