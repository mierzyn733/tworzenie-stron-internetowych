const questions = [
  {
    category: "Geography",
    question: "What is the capital of France?",
    choices: ["Paris", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    category: "Science",
    question: "What is the chemical symbol for water?",
    choices: ["H2O", "O2", "CO2"],
    answer: "H2O"
  },
  {
    category: "History",
    question: "Who was the first president of the United States?",
    choices: ["George Washington", "Abraham Lincoln", "Thomas Jefferson"],
    answer: "George Washington"
  },
  {
    category: "Math",
    question: "What is 9 x 9?",
    choices: ["81", "72", "99"],
    answer: "81"
  },
  {
    category: "Literature",
    question: "Who wrote 'Romeo and Juliet'?",
    choices: ["William Shakespeare", "Jane Austen", "Mark Twain"],
    answer: "William Shakespeare"
  }
];


function getRandomQuestion(questionsArray) {
  const randomIndex = Math.floor(Math.random() * questionsArray.length);
  return questionsArray[randomIndex];
}


function getRandomComputerChoice(choicesArray) {
  const randomIndex = Math.floor(Math.random() * choicesArray.length);
  return choicesArray[randomIndex];
}


function getResults(questionObj, computerChoice) {
  if (computerChoice === questionObj.answer) {
    return "The computer's choice is correct!";
  } else {
    return `The computer's choice is wrong. The correct answer is: ${questionObj.answer}`;
  }
}

