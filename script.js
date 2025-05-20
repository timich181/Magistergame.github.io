let state = {
    year: 1,
    budget: 500000,
    reputation: 70,
    students: 0,
    programs: [],
    gameOver: false
};

const PROGRAM_COSTS = {
    "data-science": 50000,
    "ai-ethics": 80000,
    "quantum": 120000
};

const PROGRAM_STUDENTS = {
    "data-science": 100,
    "ai-ethics": 60,
    "quantum": 40
};

function updateUI() {
    document.getElementById('year').textContent = state.year;
    document.getElementById('budget').textContent = state.budget;
    document.getElementById('reputation').textContent = state.reputation;
    document.getElementById('students').textContent = state.students;
    
    // Обновляем список программ
    const programsDiv = document.getElementById('programs');
    programsDiv.innerHTML = "<h2>Ваши программы</h2>";
    if (state.programs.length === 0) {
        programsDiv.innerHTML += "<p>Пока нет программ...</p>";
    } else {
        state.programs.forEach(prog => {
            programsDiv.innerHTML += `<div>• ${prog}</div>`;
        });
    }
}

function logEvent(message) {
    const log = document.getElementById('log');
    log.innerHTML += `<p>📅 Год ${state.year}: ${message}</p>`;
    log.scrollTop = log.scrollHeight;
}

function createProgram() {
    if (state.gameOver) return;
    
    const select = document.getElementById('program-select');
    const program = select.value;
    const cost = PROGRAM_COSTS[program];
    
    if (state.budget >= cost) {
        state.budget -= cost;
        state.programs.push(program);
        state.students += PROGRAM_STUDENTS[program];
        logEvent(`Запущена программа "${program}". Привлечено ${PROGRAM_STUDENTS[program]} студентов.`);
        checkWinCondition();
    } else {
        logEvent("❌ Недостаточно средств для создания программы!");
    }
    
    updateUI();
}

function nextYear() {
    if (state.gameOver) return;
    
    state.year++;
    
    // Доход от студентов
    const income = state.students * 1000;
    state.budget += income;
    
    // Случайные события
    if (Math.random() < 0.2) {
        // Хакерская атака
        state.budget -= 20000;
        state.reputation -= 10;
        logEvent("⚠️ Хакерская атака! Потеряно $20,000 и 10 репутации.");
    }
    
    // Проверка условий проигрыша
    if (state.budget <= 0) {
        logEvent("💀 Бюджет исчерпан. Игра окончена.");
        state.gameOver = true;
    }
    
    if (state.reputation <= 0) {
        logEvent("💀 Репутация упала до нуля. Игра окончена.");
        state.gameOver = true;
    }
    
    checkWinCondition();
    updateUI();
}

function checkWinCondition() {
    if (state.year >= 10 && 
        state.students >= 50000 && 
        state.programs.length >= 3 && 
        state.reputation >= 90) {
        logEvent("🏆 Поздравляем! Вы стали Global EdTech Leader!");
        state.gameOver = true;
    }
}

// Автоматический переход к следующему году каждые 5 секунд
setInterval(nextYear, 5000);

updateUI();
