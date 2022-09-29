const { DBconnection } = require("../index");
const { ErrorLogFile } = require("../functions.js");
module.exports = {
  name: "interactionCreate",
  execute(interaction) {
    console.log(
      `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
    );
    let post = {
      user: interaction.user.tag,
      channel: interaction.channel.name,
      interaction: interaction,
      date: new Date(),
    };
    DBconnection.query(
      "INSERT INTO user_logs SET ?",
      post,
      function (error, result) {
        if (error) ErrorLogFile(error);
      }
    );
  },
};
