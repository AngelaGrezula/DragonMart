const questions = [
  {
    question: "You find a bag of Galleons. What do you do?",
    answers: {
      gryffindor: "Return it to the owner",
      hufflepuff: "Turn it in to the headmaster",
      ravenclaw: "Inspect for magical spells",
      slytherin: "Keep it quietly"
    }
  },
  {
    question: "Pick a favorite subject at Hogwarts",
    answers: {
      gryffindor: "Defense Against the Dark Arts",
      hufflepuff: "Herbology",
      ravenclaw: "Charms",
      slytherin: "Potions"
    }
  },
  {
    question: "Choose your magical companion",
    answers: {
      gryffindor: "Phoenix",
      hufflepuff: "Niffler",
      ravenclaw: "Owl",
      slytherin: "Snake"
    }
  }
];

let currentQuestion = 0;
let scores = { gryffindor:0, hufflepuff:0, ravenclaw:0, slytherin:0 };
const container = document.getElementById("quiz-container");

function showQuestion() {
  const q = questions[currentQuestion];
  container.innerHTML = `<h4>${q.question}</h4>`;
  Object.entries(q.answers).forEach(([house, answer])=>{
    const btn = document.createElement("button");
    btn.classList.add("btn","btn-outline-light","d-block","w-100","my-2");
    btn.textContent = answer;
    btn.onclick = ()=>{
      scores[house]++;
      nextQuestion();
    }
    container.appendChild(btn);
  });
}

function nextQuestion() {
  currentQuestion++;
  if(currentQuestion<questions.length){
    showQuestion();
  } else {
    const topHouse = Object.keys(scores).reduce((a,b)=>scores[a]>scores[b]?a:b);
    localStorage.setItem("house", topHouse);
    window.location.href="result.html";
  }
}

showQuestion();
