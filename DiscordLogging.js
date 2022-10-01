const { client, DBconnection } = require("./index.js");
const { ErrorLogFile } = require("./functions.js");
const logs = require("discord-logs");
logs(client, {
  debug: true,
});
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
client.on("guildMemberUpdate", async (OldMember, newMember) => {
  console.log(OldMember);
  console.log(newMember);
});
client.on("guildMemberEntered", async (member) => {
  console.log(`${member} user joined`);
});
