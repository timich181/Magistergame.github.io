let budget = 10000;
let students = 100;
let quality = 50;
let programLevel = 1; // 1 - базовая, 2 - продвинутая, 3 - экспертная
let semester = 0;

const budgetEl = document.getElementById("budget");
const studentsEl = document.getElementById("students");
const qualityEl = document.getElementById("quality");
const qualityFill = document.getElementById("quality-fill");

// Обновление интерфейса
function updateUI() {
  budgetEl.textContent = `${formatNumber(budget)} ₽`;
  studentsEl.textContent = formatNumber(students);
  qualityEl.textContent = `${Math.floor(quality)}%`;

  // Цвет качества
  if (quality < 50) {
    qualityFill.className = "quality-bad";
  } else if (quality < 80) {
    qualityFill.className = "quality-medium";
  } else {
    qualityFill.className = "quality-good";
  }

  // Уровень магистратуры
  const progressBar = document.querySelector(".progress-bar .level");
  if (programLevel === 1) {
    progressBar.style.width = "33%";
    progressBar.textContent = "Базовая";
  } else if (programLevel === 2) {
    progressBar.style.width = "66%";
    progressBar.textContent = "Продвинутая";
  } else if (programLevel === 3) {
    progressBar.style.width = "100%";
    progressBar.textContent = "Экспертная";
  }
}

// Улучшение магистратуры
function upgradeProgram() {
  if (programLevel >= 3) return;
  const cost = programLevel === 1 ? 5000 : 10000;
  if (budget >= cost) {
    budget -= cost;
    programLevel++;
    addNews(`🛠 Магистратура улучшена до уровня ${programLevel}`);
  }
  updateUI();
}

// Инвестиции в качество
function investInQuality() {
  const investment = 2000;
  if (budget >= investment) {
    budget -= investment;
    quality = Math.min(100, quality + 10);
    addNews(`📈 Качество образования повышено до ${Math.floor(quality)}%`);
  }
  updateUI();
}

// Реклама
function launchCampaign() {
  const cost = 3000;
  if (budget >= cost) {
    budget -= cost;
    students += Math.floor(students * 0.2);
    addNews(`📢 Реклама запущена: +20% студентов`);
  }
  updateUI();
}

// Случайные события
function randomEvent() {
  const event = Math.random();
  if (event < 0.1) {
    budget -= 5000;
    addNews("⚠️ Пандемия: бюджет уменьшен на 5000 ₽");
  } else if (event < 0.2) {
    students += 10000;
    addNews("🎉 Грант: +10,000 студентов");
  }
}

// Проверка победы/поражения
function checkWinLose() {
  if (budget < 0) {
    showMessage("💀 У вас не получилось сделать всех магистрами...", "lose");
  } else if (students >= 235_000_000) {
    showMessage("🌟 Вы обучаете всех студентов мира. Невероятно!", "win");
  }
}

// Всплывающие новости
function addNews(message) {
  const newsItem = document.createElement("div");
  newsItem.className = "news-item";
  newsItem.textContent = message;
  document.getElementById("newsFeed").appendChild(newsItem);
  setTimeout(() => newsItem.remove(), 5000);
}

// Сообщение о результате
function showMessage(text, type) {
  const messageEl = document.getElementById("message");
  messageEl.textContent = text;
  messageEl.className = `message ${type}`;
  window.scrollTo(0, document.body.scrollHeight);
}

// Форматирование чисел
function formatNumber(num) {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)} млн`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)} тыс`;
  return num.toString();
}

updateUI();
