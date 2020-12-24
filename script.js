const StartBtn = document.getElementById("start_btn");
const Div1 = document.getElementById("start_box");
const ContinueBtn = document.getElementById("continue_btn");
const Div2 = document.getElementById("info_box");
const ExitBtn = document.getElementById("exit_btn");
const Div3 = document.getElementById("question_cont");
const RestartBtn = document.getElementById('rr_btn');

const nextButton = document.getElementById("next-btn");

function login(){
  var name;
  name = document.getElementById('proba').value
  document.getElementById('nameZ').innerHTML = name
}

nextButton.addEventListener('click', () => {
  if(currentQuestionIndex < 9){
    currentQuestionIndex++;
    clearTimeout(timeOut);
    clearInterval(timeAnswer);
    setNextQuestion();}
    else{
      clearTimeout(timeOut);
      clearTimeout(timeAnswer);
      printScore();
    }
});

let score = 0;
let shuffledQuestions 
var currentQuestionIndex = -1;
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

RestartBtn.addEventListener('click', back)
StartBtn.addEventListener('click', showInfo);
StartBtn.addEventListener('click', login);
ExitBtn.addEventListener("click", back);
ContinueBtn.addEventListener('click', continueQuiz);

function showInfo() {
  Div2.classList.remove('hide');
  Div1.classList.add('hide');
}
function continueQuiz() {
  Div3.classList.remove('hide');
  Div2.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  setNextQuestion();
}
function back(){
  Div1.classList.remove('hide');
  Div2.classList.add('hide');
  Div3.classList.add('hide');
  Div4.classList.add('hide');
}
function setNextQuestion(){
  resetState();
  timeLeft = 20;
  document.getElementById("timer_sec").innerHTML = timeLeft;
  timeAnswer = setInterval(changeTime, 1000);

  showQuestion(shuffledQuestions[currentQuestionIndex]);
  timeOut = setTimeout(questionTime, 20000);
}
function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if(answer.correct){
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}
function selectAnswer(e){
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  const answerI  = selectedButton.dataset.correct;
  if (answerI == "true"){
      countScore();
  } 
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
}
function setStatusClass(element, correct){
  clearStatusClass(element)
  if(correct){
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}
function clearStatusClass(element){
  element.classList.remove('correct')
  element.classList.remove('wrong')
}
function resetState() {
  clearStatusClass(document.body)
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}
function countScore(){
  score++;
}
const questions = [
  {
    question: 'What is the exact distance between earth and moon?',
    answers:  [
      {text: '600m', correct: false },
      {text: '260.210m', correct: false },
      {text: '384.400km', correct: true},
      {text: '520.600km', correct: false }
    ]
  },
    {
    question: 'How many planets are there in our soloar sistem?',
    answers:  [
      {text: '3', correct: false },
      {text: '7', correct: false },
      {text: '9', correct: false},
      {text: '8', correct: true }
    ]
  },
    {
    question: 'Who invented the telescope?',
    answers:  [
      {text: 'Hans Lippershey', correct: true },
      {text: 'Johannes Keple', correct: false },
      {text: 'Hypatia', correct: false },
      {text: 'Galileo', correct: false}     
    ]
  },
    {
    question: 'Our sun is what kind of star?',
    answers:  [
      {text: 'Medium', correct: false },
      {text: 'Giant', correct: false },
      {text: 'Super', correct: false},
      {text: 'G2V', correct: true }
    ]
  },
    {
    question: 'The colour of the hottest star is?',
    answers:  [
      {text: 'Blue', correct: false },
      {text: 'White', correct: true},
      {text: 'Yellow', correct: false },
      {text: 'Red', correct: false }
    ]
  },
    {
    question: 'Is the planet Neptune bigger than Earth?',
    answers:  [
      {text: 'No', correct: false },
      {text: 'Yes', correct: true }
    ]
  },
    {
    question: 'Can gravity form waves?',
    answers:  [
      {text: 'Only in 5th dimension', correct: false },
      {text: 'Yes, every day', correct: true },
      {text: 'No', correct: false},
      {text: 'We can never know', correct: false }
    ]
  },
    {
    question: 'Where is the edge of the universe?',
    answers:  [
      {text: 'in our minds', correct: true },
      {text: 'there are no edge', correct: false },
      {text: 'about 13.4 billions lightyears', correct: false},
      {text: 'We dont know ', correct: true }
    ]
  },
    {
    question: 'What is the name of Saturn’s largest moon?',
    answers:  [
      {text: 'Europa', correct: false },
      {text: 'Diona', correct: false },
      {text: 'Titan', correct: true},
      {text: 'Rhea', correct: false }
    ]
  },
    {
    question: 'Can a star turn into a planet?',
    answers:  [
      {text: 'No', correct: false },
      {text: 'Only Neutron Star', correct: false },
      {text: 'just  brown dwarf', correct: true},
      {text: 'Every star can', correct: false }
    ]
  },
]
function questionTime(){
  clearInterval(timeAnswer);
  if (currentQuestionIndex < 3){
    currentQuestionIndex++;
    setNextQuestion();
  } 
}

function changeTime(){
  timeLeft--;
  document.getElementById("timer_sec").innerHTML = timeLeft;
}
function printScore(){
  clearStatusClass(document.body)
  Div3.classList.add('hide');
  Div4.classList.remove('hide');
  document.getElementById('score').innerHTML = score;
}