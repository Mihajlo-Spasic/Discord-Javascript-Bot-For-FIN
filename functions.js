const fs = require("node:fs");

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

function ErrorLogFile(error) {
  const date = new Date();
  fs.appendFile(
    "ErrorLog.txt",
    `Start of Reported Error That Occured at ${date.toGMTString()} \n` +
      error.toString() +
      `\nEnd of Reported Error\n`,
    function (err) {
      console.error(err);
    }
  );
}
//Unable to access keys of an object due to npm mysql limitations (or my knowledge)
// function query(Action, TABLE, doSomething, ...rest) {
//   data = {
//     user: rest[0],
//   };
//   DBconnection.query(
//     `${Action} ${TABLE} SET ?`,
//     data,
//     function (error, result, fields) {
//       if (error) {
//         ErrorLogFile(error);
//         console.error(error);
//       }
//       doSomething();
//     }
//   );
// }

module.exports = {
  examChecker,
  dateIsValid,
  transformDate,
  ErrorLogFile,
};
