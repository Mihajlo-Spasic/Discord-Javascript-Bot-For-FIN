const { SlashCommandBuilder } = require("discord.js");
const { examChecker } = require("../functions.js");
const { DBconnection } = require("../index.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("izbrisi_ispit")
    .setDescription("Remove Exam")
    .addStringOption((option) =>
      option
        .setName("ispit")
        .setDescription("Exam that is being deleted")
        .setRequired(true)
    ),
  async execute(interaction) {
    const ExamToDelete = interaction.options.getString("ispit");
    if (examChecker(ExamToDelete)) {
      DBconnection.query(
        `DELETE FROM exams WHERE exam='${ExamToDelete}'`,
        function (error, result) {
          if (!error) interaction.reply("Ispit Izbrisan");
          else interaction.reply("Error D:");
        }
      );
    } else interaction.reply("Nema Takvog Ispita");
  },
};
