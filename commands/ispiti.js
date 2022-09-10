const { SlashCommandBuilder } = require("discord.js");
const { PythonShell } = require("python-shell");

PythonShell.run("FINdata.py", null, function (err, results) {
  console.log(typeof results);
});
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ispiti")
    .setDescription("Replies with your input!")
    .addStringOption((option) =>
      option
        .setName("godina")
        .setDescription("The input to echo back")
        .setRequired(true)
    ),
  async execute(interaction) {
    let schoolYearUserInput = interaction.options.getString("godina"); // User input lol
    await interaction.reply(`${interaction.options.getString("godina")}`);
  },
};
