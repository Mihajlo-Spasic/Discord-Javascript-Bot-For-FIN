const { SlashCommandBuilder } = require("discord.js");
const { DBconnection } = require("../index.js");
const {
  examChecker,
  dateIsValid,
  transformDate,
  ErrorLogFile,
} = require("../functions.js");

// const { PythonShell } = require("python-shell");
// Commented for the reason of changing the type of the project.

// PythonShell.run("FINdata.py", null, function (err, results) {
//   console.log(results);
// });

// Change Username/Password when initializing the project

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dodaj_ispit")
    .setDescription("Exams of the given year")
    .addStringOption((option) =>
      option
        .setName("ispit")
        .setDescription("Exam that is being added")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("vreme_ispita")
        .setDescription("Time of the exam")
        .setRequired(true)
    ),

  async execute(interaction) {
    const NameOfExam = interaction.options.getString("ispit"); // User input lol
    const TimeOfExam = interaction.options.getString("vreme_ispita"); // User input lol
    if (examChecker(NameOfExam)) {
      post = {
        exam: NameOfExam,
        date: TimeOfExam,
      };
      DBconnection.query(
        `INSERT INTO exams SET ?`,
        post,
        function (error, result) {
          if (error) ErrorLogFile(error);
          console.error(error);
          interaction.reply("Ispit dodat");
        }
      );
    } else await interaction.reply(`Nema takvog ispita na ovom fakultetu`);
  },
};
