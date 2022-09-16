const { SlashCommandBuilder } = require("discord.js");
const Database = require("@replit/database")
const db = new Database();
module.exports = {
  // Slash Command for taking the time of the Exam
  data: new SlashCommandBuilder()
    .setName("lista_ispita")
    .setDescription('List of current exams'),
  async execute(interaction) {
    ExamList(interaction)
  }
}


async function ExamList(interaction) {
  // Prefix E means Exam
  let E_list = 'Predstojeci ispiti:\n';
  await db.list().then(async (keys) => {

    for (let i = 0; i < keys.length; i++) {
      E_date = await db.get(keys[i]).then(value => value)
      E_list += `${keys[0]} datuma: ${E_date} \n`
    }
  })
  await interaction.reply(E_list)
}
