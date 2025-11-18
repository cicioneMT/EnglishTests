// ==========================
// B1 Questions – full set (20)
// ==========================
const questions = [
  {
    question: "She ___ to school every day.",
    answers: ["go", "goes", "going", "gone"],
    correct: "goes",
  },
  {
    question: "I ___ English very well.",
    answers: ["speak", "speaks", "speaking", "spoken"],
    correct: "speak",
  },
  {
    question: "We ___ dinner at 7 p.m. yesterday.",
    answers: ["have", "had", "has", "having"],
    correct: "had",
  },
  {
    question: "They ___ to the park tomorrow.",
    answers: ["go", "going", "went", "will go"],
    correct: "will go",
  },
  {
    question: "My father ___ coffee in the morning.",
    answers: ["like", "likes", "liked", "liking"],
    correct: "likes",
  },
  {
    question: "I ___ TV when she called.",
    answers: ["watch", "was watching", "watched", "watching"],
    correct: "was watching",
  },
  {
    question: "We have lived here ___ five years.",
    answers: ["since", "for", "from", "during"],
    correct: "for",
  },
  {
    question: "She ___ her homework already.",
    answers: ["did", "done", "has done", "does"],
    correct: "has done",
  },
  {
    question: "I can’t ___ this word.",
    answers: ["understand", "understands", "understood", "understanding"],
    correct: "understand",
  },
  {
    question: "There aren’t ___ apples left.",
    answers: ["some", "any", "no", "much"],
    correct: "any",
  },
  {
    question: "He is taller ___ his brother.",
    answers: ["then", "than", "that", "to"],
    correct: "than",
  },
  {
    question: "Would you like ___ tea?",
    answers: ["a", "any", "some", "many"],
    correct: "some",
  },
  {
    question: "This book is ___ interesting than that one.",
    answers: ["much", "more", "most", "many"],
    correct: "more",
  },
  {
    question: "She was born ___ 2005.",
    answers: ["in", "on", "at", "by"],
    correct: "in",
  },
  {
    question: "I have never ___ to London.",
    answers: ["be", "been", "was", "being"],
    correct: "been",
  },
  {
    question: "He is ___ engineer.",
    answers: ["a", "an", "the", "-"],
    correct: "an",
  },
  {
    question: "There is ___ milk in the fridge.",
    answers: ["a", "any", "some", "few"],
    correct: "some",
  },
  {
    question: "We didn’t go out because it ___ raining.",
    answers: ["is", "was", "were", "are"],
    correct: "was",
  },
  {
    question: "They ___ in Paris last summer.",
    answers: ["are", "is", "was", "were"],
    correct: "were",
  },
  {
    question: "She can play the piano very ___ .",
    answers: ["good", "well", "better", "best"],
    correct: "well",
  },
];

// ==========================
// Global variables
// ==========================
let shuffledQuestions = [];
let currentIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;
let studentName = "";
let studentClass = "";
let studentAnswers = [];
let startTime;
let endTime;

// HTML Elements
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const pdfBtn = document.getElementById("pdfBtn");
const quizSection = document.getElementById("quiz");
const introSection = document.querySelector(".intro");
const resultSection = document.getElementById("result");
const questionContainer = document.getElementById("questionContainer");
const progressText = document.getElementById("progressText");
const timerText = document.getElementById("timerText");
const timerFill = document.getElementById("timerFill");
const scoreText = document.getElementById("scoreText");
const dateText = document.getElementById("dateText");
const confirmInstructions = document.getElementById("confirmInstructions");

// ==========================
// Functions
// ==========================
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Start test
startBtn.addEventListener("click", () => {
  studentName = document.getElementById("studentName").value.trim();
  studentClass = document.getElementById("studentClass").value.trim();

  if (!studentName || !studentClass) {
    alert("Please enter your full name and class!");
    return;
  }

  if (!confirmInstructions.checked) {
    alert(
      "You must confirm that you have read and understood the instructions!"
    );
    return;
  }

  introSection.hidden = true;
  quizSection.hidden = false;

  shuffledQuestions = shuffle([...questions]).map((q) => ({
    ...q,
    shuffledAnswers: shuffle([...q.answers]),
  }));

  currentIndex = 0;
  score = 0;
  studentAnswers = [];
  startTime = new Date();
  showQuestion();
});

// Show question
function showQuestion() {
  clearInterval(timer);
  timeLeft = 30;

  const q = shuffledQuestions[currentIndex];
  progressText.textContent = `Question ${currentIndex + 1}/${
    shuffledQuestions.length
  }`;

  questionContainer.innerHTML = `
      <h2>${q.question}</h2>
      ${q.shuffledAnswers
        .map(
          (ans) =>
            `<label><input type="radio" name="answer" value="${ans}"> ${ans}</label>`
        )
        .join("<br>")}
    `;

  startTimer();
}

// Timer
function startTimer() {
  updateTimerUI();
  timer = setInterval(() => {
    timeLeft--;
    updateTimerUI();
    if (timeLeft <= 0) {
      clearInterval(timer);
      saveAnswer(null);
      goNext();
    }
  }, 1000);
}

function updateTimerUI() {
  timerText.textContent = `${timeLeft}s`;
  timerFill.style.width = `${(timeLeft / 30) * 100}%`;
}

// Save answer
function saveAnswer(chosen) {
  if (chosen && chosen === shuffledQuestions[currentIndex].correct) {
    score++;
  }
  studentAnswers.push(chosen);
}

// Next
nextBtn.addEventListener("click", () => {
  const selected = document.querySelector("input[name='answer']:checked");
  let chosen = null;
  if (selected) chosen = selected.value;
  saveAnswer(chosen);
  goNext();
});

function goNext() {
  currentIndex++;
  if (currentIndex < shuffledQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

// Show result
function showResult() {
  clearInterval(timer);
  quizSection.hidden = true;
  resultSection.hidden = false;
  endTime = new Date();
  scoreText.textContent = `${studentName} (${studentClass}), you scored ${score} out of ${shuffledQuestions.length}.`;
  const now = new Date();
  dateText.textContent = `Completed on: ${now.toLocaleString()}`;
}

// ==========================
// Watermark (7 times per page)
// ==========================
function addWatermark(doc) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  doc.setFontSize(40);
  doc.setTextColor(220, 220, 220);
  doc.setFont("helvetica", "bold");

  const topY = 20;
  const bottomY = pageHeight - 20;
  const step = (bottomY - topY) / 6;

  for (let i = 0; i < 7; i++) {
    const y = topY + i * step;
    doc.text("Teacher Gabriela Neculai", pageWidth / 2, y, {
      angle: -45,
      align: "center",
      maxWidth: Infinity,
    });
  }
}

// ==========================
// Export PDF
// ==========================
pdfBtn.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const totalSeconds = Math.floor((endTime - startTime) / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const totalTimeFormatted = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
  const averageTime = (totalSeconds / shuffledQuestions.length).toFixed(1);

  const grade = (2 + (score / shuffledQuestions.length) * 8).toFixed(1);

  const questionsPerPage = 5;

  for (let page = 0; page < 4; page++) {
    if (page > 0) doc.addPage();
    addWatermark(doc);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("English Test Report – B1 Level", 20, 20);

    doc.setFontSize(10);
    doc.text(`Student: ${studentName}`, 20, 28);
    doc.text(`Class: ${studentClass}`, 20, 34);
    doc.text(`Page ${page + 1}/4`, 160, 20);

    let y = 50;
    const startQ = page * questionsPerPage;
    const endQ = Math.min(startQ + questionsPerPage, shuffledQuestions.length);

    for (let i = startQ; i < endQ; i++) {
      const q = shuffledQuestions[i];
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      doc.setFont(undefined, "bold");
      doc.text(`${i + 1}. ${q.question}`, 20, y);
      y += 6;

      q.shuffledAnswers.forEach((ans) => {
        let text = `- ${ans}`;
        let isCorrect = ans === q.correct;
        let chosen = studentAnswers[i] === ans;

        if (isCorrect) {
          doc.setFont(undefined, "bold");
          doc.setTextColor(0, 0, 0);
        } else {
          doc.setFont(undefined, "normal");
        }

        if (chosen && !isCorrect) {
          doc.setTextColor(200, 0, 0);
        } else if (!isCorrect) {
          doc.setTextColor(0, 0, 0);
        }

        doc.text(text, 30, y);
        y += 5;
      });

      let chosen = studentAnswers[i];
      if (chosen === null) {
        doc.setTextColor(128, 128, 128);
        doc.text("Student answer: None", 30, y);
      } else if (chosen === q.correct) {
        doc.setTextColor(0, 150, 0);
        doc.text(`Student answer: ${chosen}`, 30, y);
      } else {
        doc.setTextColor(200, 0, 0);
        doc.text(`Student answer: ${chosen}`, 30, y);
      }
      y += 8;
    }

    // Legend + statistics + grade
    if (page === 3) {
      y += 10;
      doc.setTextColor(0, 0, 0);
      doc.setFont(undefined, "bold");
      doc.text("Legend:", 20, y);
      y += 6;
      doc.setFont(undefined, "normal");
      doc.setTextColor(0, 150, 0);
      doc.text("Green = Correct answer", 30, y);
      y += 5;
      doc.setTextColor(200, 0, 0);
      doc.text("Red = Wrong answer", 30, y);
      y += 5;
      doc.setTextColor(128, 128, 128);
      doc.text("Grey = No answer", 30, y);
      y += 6;
      doc.setTextColor(0, 0, 0);
      doc.text(
        `Total time: ${totalTimeFormatted} | Average per question: ${averageTime}s`,
        30,
        y
      );
      y += 6;
      doc.text(
        `Result: ${score}/${shuffledQuestions.length} correct answers | Grade: ${grade}`,
        30,
        y
      );
    }
  }

  doc.save(`English_Test_Report_B1_${studentName}.pdf`);
});
