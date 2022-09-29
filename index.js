const fs = require("node:fs");
const mysql = require("mysql");
const path = require("node:path");
const { ErrorLogFile } = require("./functions.js");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { token, DBPassword } = require("./config.json");

const DBconnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: DBPassword,
  database: "discordbot",
});
module.exports = { DBconnection };
const { REST } = require("@discordjs/rest");

// const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildScheduledEvents,
  ],
});
const logs = require("discord-logs");
logs(client, { debug: true });

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.data.name, command);
}

client.on("guildMemberRoleRemove", async (member, role) => {
  data = {
    user: member.user.tag,
    type: "Remove",
    role: role.name,
    date: new Date(),
  };
  DBconnection.query(
    "INSERT INTO member_roles_logs SET ?",
    data,
    function (error, result) {
      if (error) {
        ErrorLogFile(error);
        console.error(error);
      }
    }
  );
});
client.on("guildMemberRoleAdd", async (member, role) => {
  data = {
    user: member.user.tag,
    type: "Add",
    role: role.name,
    date: new Date(),
  };
  DBconnection.query(
    "INSERT INTO member_roles_logs SET ?",
    data,
    function (error, result) {
      if (error) {
        ErrorLogFile(error);
        console.error(error);
      }
    }
  );
});
client.on("guildMemberSpeaking", async (member, speaking) => {
  console.log("????????");
  console.log(`a guild member starts/stops speaking: ${member.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(token);
