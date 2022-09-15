const { SlashCommandBuilder } = require("discord.js");
const Database = require("@replit/database")
const db = new Database();
module.exports = {
  // Slash Command for taking the time of the Exam
  data: new SlashCommandBuilder()
    .setName("izbrisi_ispit")
    .setDescription('Remove Exam')
    .addStringOption(option => 
      option
      .setName("ispit")
      .setDescription("Exam that is being deleted")
      .setRequired(true)
    ),
  async execute(interaction){
    const ExamToDelete = interaction.options.getString('ispit');

    
    if (db.delete(ExamToDelete).then(() => {}))
      await interaction.reply("Ispit izbrisan")
  }

}