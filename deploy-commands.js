const fs = require("node:fs");
const path = require("node:path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
// const { clientId, guildId, token } = require("./config.json");
const clientId = process.env.clientId;
const guildId = process.env.guildId;
const token = process.env.token;

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // console.log(command.data);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(token);

// rest
//   .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
//   .then(() => console.log("Successfully registered application commands."))
//   .catch(console.error);
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();
