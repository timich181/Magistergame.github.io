// === Переменные ===
let budget = 10000;
let students = 100;
let semester = 0;
let supportLevel = 50;
let chartData = [];

const budgetEl = document.getElementById("budget");
const studentsEl = document.getElementById("students");
const supportEl = document.getElementById("support");
const newsFeed = document.getElementById("newsFeed");
const messageEl = document.getElementById("message");

const devSlider = document.getElementById("devSlider");
const adSlider = document.getElementById("adSlider");
const supSlider = document.getElementById("supSlider");

const devCostEl = document.getElementById("devCost");
const adCostEl = document.getElementById("adCost");
const supCostEl = document.getElementById("supCost");

const timerBar = document.getElementById("timerBar");

// === График ===
const ctx = document.getElementById('chart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Студенты',
      data: [],
      borderColor: '#2980b9',
      fill: false
    }]
  }
});

// === Форматирование чисел ===
function formatNumber(num) {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)} млн`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)} тыс`;
  return num.toString();
}

// === Обновление интерфейса ===
function updateUI() {
  budgetEl.textContent = `${formatNumber(budget)} ₽`;
  studentsEl.textContent = `${formatNumber(students)}`;
  supportEl.textContent = `${Math.round((parseInt(supSlider.value) / budget) * 100)}%`;

  devCostEl.textContent = `${formatNumber(parseInt(devSlider.value))} ₽`;
  adCostEl.textContent = `${formatNumber(parseInt(adSlider.value))} ₽`;
  supCostEl.textContent = `${formatNumber(parseInt(supSlider.value))} ₽`;
}

devSlider.addEventListener("input", updateUI);
adSlider.addEventListener("input", updateUI);
supSlider.addEventListener("input", updateUI);

// === Запуск семестра ===
document.getElementById("nextSemester").addEventListener("click", () => {
  const devCost = parseInt(devSlider.value);
  const adCost = parseInt(adSlider.value);
  const supCost = parseInt(supSlider.value);
  const totalCost = devCost + adCost + supCost;

  if (totalCost > budget) {
    showMessage("❌ Недостаточно бюджета!", "lose");
    return;
  }

  // === Расходы ===
  budget -= totalCost;
  const income = students * 100;
  budget += income;

  // === Разработка: +1 студент на 100 ₽ ===
  const newPrograms = Math.floor(devCost / 100);
  students += newPrograms * 50;

  // === Реклама: +10–100% студентов ===
  const adBoost = Math.floor(Math.random() * 100 + 10);
  students = Math.floor(students * (1 + adBoost / 100));

  // === Сопровождение: уровень = supCost / budget * 100 ===
  supportLevel = (supCost / budget) * 100;
  if (supportLevel < 50) students = Math.floor(students * 0.8);

  // === Ограничение студентов ===
  students = Math.min(students, 235_000_000);

  // === Случайные события ===
  randomEvent();

  // === Обновление графика ===
  chart.data.labels.push(`Семестр ${semester + 1}`);
  chart.data.datasets[0].data.push(students);
  chart.update();

  updateUI();
  semester++;
  checkWinLose();
});

// === Случайные события ===
function randomEvent() {
  const event = Math.random();
  if (event < 0.1) {
    students = Math.floor(students * 0.7);
    addNews("⚠️ Пандемия: студенты ушли (-30%)");
  } else if (event < 0.2) {
    budget += 10000;
    addNews("🎉 Грант: +10 000 ₽");
  } else if (event < 0.3) {
    supportLevel = Math.max(0, supportLevel - 15);
    addNews("📉 Сбой сервера: сопровождение упало на -15%");
  } else if (event < 0.4) {
    students += 10000;
    addNews("🚀 Партнёрство с Яндекс: +10 000 студентов");
  }
}

// === Всплывающие новости ===
function addNews(message) {
  const newsItem = document.createElement("div");
  newsItem.className = "news-item";
  newsItem.textContent = message;
  newsFeed.appendChild(newsItem);
  setTimeout(() => newsItem.remove(), 5000);
}

// === Проверка победы/поражения ===
function checkWinLose() {
  if (budget < 0) {
    showMessage("💀 У вас не получилось сделать всех магистрами...", "lose");
  } else if (students >= 235_000_000) {
    showMessage("🌟 Вы обучаете всех студентов мира. Невероятно!", "win");
  }
}

// === Сообщение о результате ===
function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = `message ${type}`;
  window.scrollTo(0, document.body.scrollHeight);
}

// === Анимация таймера ===
function startTimer() {
  timerBar.style.width = "0%";
  setTimeout(() => {
    timerBar.style.width = "100%";
  }, 100);
}

// Запуск таймера при нажатии
document.getElementById("nextSemester").addEventListener("click", startTimer);

updateUI();
