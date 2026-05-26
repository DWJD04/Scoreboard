// Score Logic
const scores = { home: 0, away: 0 };
const homeDisplay = document.querySelector('.homecard .score');
const awayDisplay = document.querySelector('.awaycard .score');

document.getElementById('home-increase').addEventListener('click', () => updateScore('home', 1));
document.getElementById('home-decrease').addEventListener('click', () => updateScore('home', -1));
document.getElementById('away-increase').addEventListener('click', () => updateScore('away', 1));
document.getElementById('away-decrease').addEventListener('click', () => updateScore('away', -1));

function updateScore(team, amount) {
    scores[team] = Math.max(0, scores[team] + amount);
    if (team === 'home') homeDisplay.innerText = scores[team];
    else awayDisplay.innerText = scores[team];
}

// Timer Logic
let timeLeft = 1200; // 20 minutes
let timerInterval = null;
const timerDisplay = document.querySelector('.timer');

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.innerText = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

document.getElementById('start-timer').addEventListener('click', () => {
    if (timerInterval) return;
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;
        }
    }, 1000);
});

document.getElementById('pause-timer').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

document.getElementById('reset-timer').addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    timeLeft = 1200;
    updateTimerDisplay();
});

// Save Game Logic
const historyTableBody = document.querySelector('#history-table tbody');

document.getElementById('save-game').addEventListener('click', () => {
    const now = new Date();
    const dateStr = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Get current team names from labels
    const homeName = document.querySelector('.homecard .teamlabel').innerText;
    const awayName = document.querySelector('.awaycard .teamlabel').innerText;
    const finalScore = `${scores.home} - ${scores.away}`;

    // Create new row
    const row = document.createElement('tr');
    
    // Date Cell
    const dateCell = document.createElement('td');
    dateCell.innerText = dateStr;
    
    // Home Team Cell (Editable)
    const homeCell = document.createElement('td');
    homeCell.innerText = homeName;
    homeCell.contentEditable = "true";
    
    // Away Team Cell (Editable)
    const awayCell = document.createElement('td');
    awayCell.innerText = awayName;
    awayCell.contentEditable = "true";
    
    // Score Cell
    const scoreCell = document.createElement('td');
    scoreCell.innerText = finalScore;

    row.append(dateCell, homeCell, awayCell, scoreCell);
    historyTableBody.prepend(row); // Add to top of table
});

document.getElementById('clear-table').addEventListener('click', () => {
    historyTableBody.innerHTML = '';
});