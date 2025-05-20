const budgetEl = document.getElementById("budget");
const studentsEl = document.getElementById("students");
const supportEl = document.getElementById("support");
const resultEl = document.getElementById("result");
const messageEl = document.getElementById("message");

let budget = 10000;
let students = 100;
let semester = 0;

const devSlider = document.getElementById("devSlider");
const adSlider = document.getElementById("adSlider");
const supSlider = document.getElementById("supSlider");

const devCostEl = document.getElementById("devCost");
const adCostEl = document.getElementById("adCost");
const supCostEl = document.getElementById("supCost");

function formatNumber(num) {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)} млн`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(0)} тыс`;
  return num.toString();
}

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

document.getElementById("nextSemester").addEventListener("click", () => {
  const devCost = parseInt(devSlider.value);
  const adCost = parseInt(adSlider.value);
  const supCost = parseInt(supSlider.value);
  const totalCost = devCost + adCost + supCost;

  if (totalCost > budget) {
    showMessage("❌ Недостаточно бюджета!", "lose");
    return;
  }

  budget -= totalCost;
  const income = students * 100;
  budget += income;

  // Разработка: +1 студент на 100 ₽
  const newPrograms = Math.floor(devCost / 100);
  students += newPrograms * 50;

  // Реклама: +10–100% студентов
  const adBoost = Math.floor(Math.random() * 100 + 10);
  students = Math.floor(students * (1 + adBoost / 100));

  // Сопровождение: уровень = supCost / budget * 100
  const supportLevel = (supCost / budget) * 100;
  if (supportLevel < 50) students = Math.floor(students * 0.8);

  // Ограничение студентов
  students = Math.min(students, 235_000_000);

  // Случайное событие
  if (Math.random() < 0.2) {
    const event = Math.random();
    if (event < 0.5) {
      budget -= 5000;
      resultEl.textContent += "⚠️ Кризис удалённого обучения: -5 000 ₽\n";
    } else {
      students += 10000;
      resultEl.textContent += "🎉 Партнёрство с Яндекс: +10 000 студентов\n";
    }
  }

  updateUI();
  semester++;
  checkWinLose();
});

function checkWinLose() {
  if (budget < 0) {
    showMessage("💀 У вас не получилось сделать всех магистрами...", "lose");
  } else if (students >= 235_000_000) {
    showMessage("🌟 Вы обучаете всех студентов мира. Невероятно!", "win");
  }
}

function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.className = `message ${type}`;
  window.scrollTo(0, document.body.scrollHeight);
}
