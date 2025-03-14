// script.js
let count = 0;
const countElement = document.getElementById('count');
const incrementButton = document.getElementById('increment');
const decrementButton = document.getElementById('decrement');
const resetButton = document.getElementById('reset');
const saveButton = document.getElementById('save');
const viewHistoryButton = document.getElementById('view-history');
const closeHistoryButton = document.getElementById('close-history');
const clearHistoryButton = document.getElementById('clear-history');
const historyPanel = document.getElementById('history-panel');
const historyList = document.getElementById('history-list');

// Load history from localStorage
let history = JSON.parse(localStorage.getItem('tallyHistory')) || [];

// Display history on page load
displayHistory();

// Increment the counter
incrementButton.addEventListener('click', () => {
  count++;
  updateCount();
});

// Decrement the counter (prevent negative numbers)
decrementButton.addEventListener('click', () => {
  if (count > 0) {
    count--;
    updateCount();
  }
});

// Reset the counter
resetButton.addEventListener('click', () => {
  count = 0;
  updateCount();
});

// Update the displayed count
function updateCount() {
  countElement.textContent = count;
}

// Save the current count to history
saveButton.addEventListener('click', () => {
  const timestamp = new Date().toLocaleString();
  history.push({ count, timestamp });
  localStorage.setItem('tallyHistory', JSON.stringify(history));
  displayHistory();
});

// Display history
function displayHistory() {
  historyList.innerHTML = ''; // Clear the list
  history.forEach((entry, index) => {
    const li = document.createElement('li');
    li.textContent = `Count: ${entry.count} (Saved on: ${entry.timestamp})`;
    historyList.appendChild(li);
  });
}

// Show history panel
viewHistoryButton.addEventListener('click', () => {
  historyPanel.classList.add('open');
});

// Hide history panel
closeHistoryButton.addEventListener('click', () => {
  historyPanel.classList.remove('open');
});

// Clear history
clearHistoryButton.addEventListener('click', () => {
  history = []; // Clear the history array
  localStorage.setItem('tallyHistory', JSON.stringify(history)); // Update localStorage
  displayHistory(); // Refresh the history list
});

// Keyboard Controls
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
    case 'ArrowRight':
      count++;
      updateCount();
      break;
    case 'ArrowDown':
    case 'ArrowLeft':
      if (count > 0) {
        count--;
        updateCount();
      }
      break;
  }
});