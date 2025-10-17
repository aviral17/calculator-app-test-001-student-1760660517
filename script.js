// JavaScript for calculator functionality
(function() {
  const display = document.getElementById('display');
  const buttons = document.querySelectorAll('.buttons button');

  let currentInput = '';
  let previousInput = '';
  let currentOperator = null;
  let shouldResetNext = false;

  // Function to update the display
  function updateDisplay() {
    display.textContent = currentInput || '0';
  }

  // Reset calculator state
  function resetCalculator() {
    currentInput = '';
    previousInput = '';
    currentOperator = null;
    shouldResetNext = false;
  }

  // Calculate the result based on previous input, current input, and operator
  function calculate() {
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current) || !currentOperator) return null;
    let result;
    switch(currentOperator) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        if (current === 0) {
          alert('Error: Division by zero');
          return null;
        }
        result = prev / current;
        break;
      default:
        return null;
    }
    return result;
  }

  // Handle digit button clicks
  function handleDigit(digit) {
    if (shouldResetNext) {
      currentInput = '';
      shouldResetNext = false;
    }
    if (currentInput === '0') {
      currentInput = digit;
    } else {
      currentInput += digit;
    }
    updateDisplay();
  }

  // Handle operator button clicks
  function handleOperator(op) {
    if (currentInput === '') {
      // Change operator if already set
      if (previousInput !== '') {
        currentOperator = op;
      }
      return;
    }
    if (previousInput !== '') {
      const result = calculate();
      if (result !== null) {
        previousInput = result.toString();
        currentInput = '';
        updateDisplay();
      }
    } else {
      previousInput = currentInput;
    }
    currentOperator = op;
    shouldResetNext = true;
  }

  // Handle equals button
  function handleEquals() {
    if (currentInput === '' || previousInput === '' || !currentOperator) return;
    const result = calculate();
    if (result !== null) {
      currentInput = result.toString();
      previousInput = '';
      currentOperator = null;
      updateDisplay();
      shouldResetNext = true;
    }
  }

  // Handle clear button
  function handleClear() {
    resetCalculator();
    updateDisplay();
  }

  // Add event listeners to buttons
  buttons.forEach(button => {
    if (button.classList.contains('digit')) {
      button.addEventListener('click', () => handleDigit(button.dataset.digit));
    } else if (button.classList.contains('operator')) {
      button.addEventListener('click', () => handleOperator(button.dataset.op));
    } else if (button.id === 'equals') {
      button.addEventListener('click', handleEquals);
    } else if (button.id === 'clear') {
      button.addEventListener('click', handleClear);
    }
  });

  // Initialize display
  updateDisplay();
})();