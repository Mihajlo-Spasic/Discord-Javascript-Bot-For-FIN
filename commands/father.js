const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("father")
    .setDescription("Replies with the creator's name"),
  async execute(interaction) {
    await interaction.reply("Mihajlo Spasic");
  },
};
