const questions = [
    { q: "Which Java feature allows a class to inherit another class?", options: ["Encapsulation","Inheritance","Abstraction","Polymorphism"], answer: 1 },
    { q: "Which collection does NOT allow duplicate elements?", options: ["List","Set","Map","ArrayList"], answer: 1 },
    { q: "What is the purpose of the 'final' keyword in Java?", options: ["To make class inheritable","To prevent inheritance/override/change","To enable polymorphism","To allow multiple inheritance"], answer: 1 },
    { q: "Which JVM memory area stores class metadata?", options: ["Heap","Stack","Method Area","PC Register"], answer: 2 },
    { q: "Which concept allows multiple methods with same name but different parameters?", options: ["Overriding","Inheritance","Overloading","Encapsulation"], answer: 2 }
];

// ===== State =====
let currentQuestion = 0;
let score = 0;
let locked = false;

// ===== DOM Elements =====
const questionEl = document.getElementById("question");
const option0 = document.getElementById("op0");
const option1 = document.getElementById("op1");
const option2 = document.getElementById("op2");
const option3 = document.getElementById("op3");
const nextBtn = document.getElementById("next");
const backBtn = document.getElementById("back");
const scoreBox = document.getElementById("scoreBox");
const restartBtn = document.getElementById("restartBtn");
const optionsBox = document.getElementById("optionsBox");
const themeToggle = document.getElementById("themeToggle");

// ===== Load Question =====
function loadQuestion() {
    locked = false;
    scoreBox.innerText = `Score: ${score}/${questions.length}`;
    restartBtn.style.display = "none";
    optionsBox.style.display = "flex";
    nextBtn.style.display = "none";

    const q = questions[currentQuestion];
    questionEl.innerText = q.q;

    option0.innerText = q.options[0];
    option1.innerText = q.options[1];
    option2.innerText = q.options[2];
    option3.innerText = q.options[3];

    [option0, option1, option2, option3].forEach(btn => btn.className = "");

    backBtn.style.display = currentQuestion === 0 ? "none" : "inline-block";
}

// ===== Check Answer =====
function checkAnswer(index) {
    if (locked) return;
    locked = true;

    const correctIndex = questions[currentQuestion].answer;
    const optionButtons = [option0, option1, option2, option3];

    if (index === correctIndex) {
        optionButtons[index].classList.add("correct");
        score++;
    } else {
        optionButtons[index].classList.add("wrong");
        optionButtons[correctIndex].classList.add("correct");
    }

    scoreBox.innerText = `Score: ${score}/${questions.length}`;
    nextBtn.style.display = "block";
}

// ===== Next Question =====
function nextQuestion() {
    if(currentQuestion < questions.length - 1){
        currentQuestion++;
        loadQuestion();
    } else {
        showResult();
    }
}

// ===== Previous Question =====
function prevQuestion() {
    if(currentQuestion > 0){
        currentQuestion--;
        loadQuestion();
    }
}

// ===== Show Result =====
function showResult() {
    questionEl.innerText = "Quiz Finished 🎉";
    optionsBox.style.display = "none";
    nextBtn.style.display = "none";
    backBtn.style.display = "none";
    scoreBox.innerText = `Final Score: ${score} / ${questions.length}`;
    restartBtn.style.display = "block";
}

// ===== Restart Quiz =====
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    loadQuestion();
}

// ===== Init =====
loadQuestion();

const themeBtn = document.getElementById("themeToggle");

// Set default icon on load
themeBtn.innerHTML = `<i class="ri-moon-fill"></i>`; // moon = click to go dark

themeBtn.addEventListener("click", ()=>{
    if(document.body.classList.contains("light")){
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        themeBtn.innerHTML = `<i class="ri-sun-line"></i>`; // sun = click to go light
    } else {
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        themeBtn.innerHTML = `<i class="ri-moon-fill"></i>`; // moon = click to go dark
    }
});