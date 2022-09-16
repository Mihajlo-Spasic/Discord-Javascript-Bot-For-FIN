const { SlashCommandBuilder } = require("discord.js");
const Database = require("@replit/database")
const db = new Database()

// const ExamChecker = require("../predmeti.js");

// const { PythonShell } = require("python-shell");
// Commented for the reason of changing the type of the project.

// PythonShell.run("FINdata.py", null, function (err, results) {
//   console.log(results);
// });

// Change Username/Password when initializing the project

module.exports = {
  // Slash Command for taking the time of the Exam
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
    let NameOfExam = interaction.options.getString("ispit"); // User input lol
    let TimeOfExam = interaction.options.getString("vreme_ispita"); // User input lol
    db.set(NameOfExam, TimeOfExam).then(() => { });


    // Offical Date YYYY-MM-DD
    // Expected Date DD-MM-YYYY
    // if (!dateIsValid(new Date(transformDate(TimeOfExam)))) return 0;


    db.list().then(keys => console.log(keys))
    db.get(NameOfExam).then(value => console.log(value));
    await interaction.reply(`${examChecker(NameOfExam)}, ${TimeOfExam}`);
  },
};

function examChecker(GivenExam) {
  const Exam = [
    "matematika 1",
    "matematika 2",
    "matematika 3",
    "matematika 4",
    "osnovi elektrotehnike",
    "inzenjerska mehanika",
    "praktikum iz osnova elektrotehnike",
    "praktikum iz osnova racunarske tehinke",
    "osnovi racunarske tehinke",
    "osnovi racunarske tehinke 1",
    "osnovi racunarske tehinke 2",
    "algoritmi i strukture podataka",
    "osnovi preduzetnickog menadzmenta i ekonomije",
    "osnovi preduzetnickog menadzmenta",
    "arhitektura racunarskih sistema",
    "programski jezici",
    "statistika",
    "statistika u inzenjerstvu",
    "objektno orijentisano programiranje",
    "signali",
    "signali i sistemi",
    "elektronika",
    "numericka analiza",
    "numericka analiza i diskretna matematika",
    "diskretna matematika",
    "operativni sistemi",
    "racunarske osnove interneta",
    "mikroprocesorski sistemi",
    "programiranje internet aplikacija",
    "softverski inzenjering",
    "softverski inzenjering 1",
    "softverski inzenjering 2",
    "paralelni racunaski sistemi",
    "baze podataka",
    "projektovanje informacionih sistema",
    "projektovanje informacionih sistema i baza podataka",
    "strucna praksa",
    "vestacka inteligencija",
    "upravljanje softverskim projektima",
    "diplomski ",
    "diplomski rad",
  ];
  return Exam.includes(GivenExam);
}
function dateIsValid(date) {
  return date instanceof Date && !isNaN(date);
}

// Transforms Date to official 8601 format

// Check if date has passed
function transformDate(date) {
  if (date.length > 10) return false;

  const day = date.slice(0, 2);
  const month = date.slice(3, 5);
  const year = date.slice(6);

  date = year + "-" + month + "-" + day;
}
