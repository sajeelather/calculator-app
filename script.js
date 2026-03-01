const resultEl = document.getElementById('result');
const expressionEl = document.getElementById('expression');

let current = '0';
let previous = null;
let operator = null;
let resetNext = false;
let justEqualed = false;

function updateDisplay() {
  resultEl.textContent = current;
  const len = current.length;
  resultEl.className = 'result' + (len > 12 ? ' xsmall' : len > 9 ? ' small' : '');
}

function formatNum(n) {
  if (isNaN(n) || !isFinite(n)) return n.toString();
  return parseFloat(n.toPrecision(12)).toString();
}

function compute() {
  const a = parseFloat(previous);
  const b = parseFloat(current);
  if (isNaN(a) || isNaN(b)) return current;

  switch (operator) {
    case '+': return formatNum(a + b);
    case '−': return formatNum(a - b);
    case '×': return formatNum(a * b);
    case '÷': return b === 0 ? 'Error' : formatNum(a / b);
  }
}

function handleAction(action, value) {

  if (action === 'clear') {
    current = '0';
    previous = null;
    operator = null;
    resetNext = false;
    justEqualed = false;
    expressionEl.textContent = '';
    resultEl.classList.remove('accent');
    updateDisplay();
    return;
  }

  if (action === 'digit') {
    if (resetNext || justEqualed) {
      current = '0';
      resetNext = false;
      justEqualed = false;
    }
    current = current === '0' ? value : current + value;
    updateDisplay();
    return;
  }

  if (action === 'operator') {
    if (operator && !resetNext) current = compute();
    previous = current;
    operator = value;
    expressionEl.textContent = previous + ' ' + operator;
    resetNext = true;
    updateDisplay();
    return;
  }

  if (action === 'equals') {
    if (!operator) return;
    current = compute();
    expressionEl.textContent = previous + ' ' + operator + ' ' + current;
    operator = null;
    resultEl.classList.add('accent');
    justEqualed = true;
    updateDisplay();
  }
}

document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', () => {
    handleAction(btn.dataset.action, btn.dataset.value);
  });
}); 