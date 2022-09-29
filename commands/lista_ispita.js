const { SlashCommandBuilder } = require("discord.js");
const { DBconnection } = require("../index.js");
const { ErrorLogFile } = require("../functions.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("lista_ispita")
    .setDescription("List of current exams"),
  async execute(interaction) {
    ExamList(interaction);
  },
};

async function ExamList(interaction) {
  // Prefix E means Exam
  let E_list = "Predstojeci ispiti:\n";

  DBconnection.query("SELECT * FROM exams", function (error, result, fields) {
    if (error) {
      ErrorLogFile(error);
      console.error(error);
    }
    for (let i = 0; i < result.length; i++) {
      E_date = result[i].date.toUTCString();
      E_list += `${result[i].exam} datuma: ${E_date} \n`;
    }
    if (E_list === `Predstojeci ispiti:\n`)
      interaction.reply("Nema trenutnih ispita :D \nliar");
    else interaction.reply(E_list);
  });
}
