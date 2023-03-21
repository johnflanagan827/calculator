// CONSTANTS
const output = document.getElementById('output');
const buttons = document.getElementsByTagName('button');
const numbers = document.querySelectorAll('.number');
const clear = document.getElementById('clear');
const divide = document.getElementById('divide');
const multiply = document.getElementById('multiply');
const subtract = document.getElementById('subtract');
const add = document.getElementById('add');
const equals = document.getElementById('equals');
const percent = document.getElementById('percent');
const plusMinus = document.getElementById('plus-minus');
const slider = document.getElementById('switch');

// VARIABLES
let leftOperand = 0;
let rightOperand = 0;
let currOperation;
let clearDisplay = false;
let enterStatus = false;
let darkMode = false;

// FUNCTIONS

// performs calculator operation
function calculate(leftOperand, rightOperand, currOperation) {
  if (isNaN(leftOperand)) {
    return 'Error';
  }

  let result;
  if (currOperation === '/') {
    if (output.textContent === '0') {
      result = 'Error';
    } else {
      result = leftOperand / rightOperand;
    }
  } else if (currOperation === '*') {
    result = leftOperand * rightOperand;
  } else if (currOperation === '-') {
    result = (leftOperand * 1000000000 - rightOperand * 1000000000) / 1000000000;
  } else if (currOperation === '+') {
    result = (leftOperand * 1000000000 + rightOperand * 1000000000) / 1000000000;
  } else {
    result = rightOperand;
  }
  return formatResults(result);
}

// formats result properly for display
function formatResults(result) {
  if (result === Infinity) {
    result = 'Error';
  }
  if (result.toString().length >= 10) {
    if (result.toString().includes('-')) {
      result = result.toPrecision(9);
    } else {
      result = result.toPrecision(9);
    }
    if (result.includes('e')) {
      let e = result.substring(result.indexOf('e'));
      result = result.substring(0, 10 - e.length) + e;
    }
  }
  return result;
}

// performs operation of specified operator
function performOperation(operator) {
  leftOperand = output.textContent.replaceAll(',', '');
  enterStatus = false;
  clearDisplay = true;
  currOperation = operator;
}

// performs equal operation
function performEqual() {
  if (!enterStatus) {
    rightOperand = output.textContent.replaceAll(',', '');
  }
  output.textContent = calculate(
    parseFloat(leftOperand),
    parseFloat(rightOperand),
    currOperation
  );
  leftOperand = output.textContent.replaceAll(',', '');
  enterStatus = true;
}

// sets calculator theme
function setTheme(
  htmlBackground,
  calculatorBackground,
  numberBackground,
  operationBackground,
  operationOtherBackground,
  dayNightColor
) {
  document.getElementsByTagName('html')[0].style.backgroundColor =
    htmlBackground;
  document.querySelectorAll('.container')[0].style.backgroundColor =
    calculatorBackground;
  document.querySelectorAll('.btn-row').forEach((e) => {
    e.style.backgroundColor = calculatorBackground;
  });
  document.getElementById('output').style.backgroundColor =
    calculatorBackground;
  document.querySelectorAll('.number').forEach((e) => {
    e.style.backgroundColor = numberBackground;
  });
  document.querySelectorAll('.operation').forEach((e) => {
    e.style.backgroundColor = operationBackground;
  });
  document.querySelectorAll('.operation-other').forEach((e) => {
    e.style.backgroundColor = operationOtherBackground;
  });
  document.querySelectorAll('.day-night').forEach((e) => {
    e.style.color = dayNightColor;
  });
}



// EVENT LISTENERS
numbers.forEach((e) => {
  e.addEventListener('click', () => {
    if (
      (output.textContent === '0' ||
        output.textContent === 'Error' ||
        clearDisplay) && e.value !== '.'
    ) {
      enterStatus = false;
      output.textContent = e.value;
      clearDisplay = false;
    } else if (enterStatus || (output.textContent.length == 10 && output.textContent.includes('.')) || output.textContent.length == 11 || (output.textContent.length == 12 && output.textContent.includes('-'))) {
      return;
    } else if (output.textContent === '-0') {
      enterStatus = false;
      output.textContent = '-' + e.value;
      clearDisplay = false;
    } else {
      if (!(e.value === '.' && output.textContent.includes('.'))) {
        if (e.value === '.' || output.textContent.includes('.') || output.textContent === '0.') {
          output.textContent = output.textContent + e.value;
        } else {
          output.textContent = parseFloat(output.textContent.replaceAll(',', '') + e.value).toLocaleString('en-us');
        }
      }
    }
  });
  window.addEventListener('keypress', (event) => {
    if (event.key == e.value) {
      e.click();
    }
  });
});

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('mousedown', () => {
    buttons[i].style.transform = 'translateY(0.25rem)';
    document.addEventListener('mouseup', () => {
      buttons[i].style.transform = '';
    });
  });
}

clear.addEventListener('click', () => {
  enterStatus = false;
  output.textContent = '0';
  leftOperand = 0;
  currOperation = '';
});

divide.addEventListener('click', () => {
  performOperation('/');
});

multiply.addEventListener('click', () => {
  performOperation('*');
});

subtract.addEventListener('click', () => {
  performOperation('-');
});

add.addEventListener('click', () => {
  performOperation('+');
});

equals.addEventListener('click', () => {
  performEqual();
});

percent.addEventListener('click', () => {
  if (output.textContent !== '0') {
    output.textContent = calculate(parseFloat(output.textContent.replaceAll(',', '')), 100, '/');
  }
});

plusMinus.addEventListener('click', () => {
  if (enterStatus) {
    return;
  } else if (clearDisplay) {
    output.textContent = '-0';
    clearDisplay = false;
  } else if (output.textContent.includes('-')) {
    output.textContent = output.textContent.substring(1, output.textContent.length);
  } else {
    output.textContent = '-' + output.textContent;
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === '/') {
    performOperation('/');
  } else if (e.key === '*') {
    performOperation('*');
  } else if (e.key === '-') {
    performOperation('-');
  } else if (e.key === '+') {
    performOperation('+');
  } else if (e.key === 'Enter') {
    performEqual();
  } else if (e.key === '%') {
    if (output.textContent !== '0') {
      output.textContent = calculate(parseFloat(output.textContent.replaceAll(',', '')), 100, '/');
    }
  } else if (e.key === 'Backspace') {
    if (enterStatus) {
      return;
    } else if (output.textContent.length === 1) {
      output.textContent = '0';
    } else if (output.textContent !== 'Error') {
      output.textContent = output.textContent.substring(
        0,
        output.textContent.length - 1
      );
    }
  }
});

slider.addEventListener('click', () => {
  if (darkMode) {
    setTheme('#f5dfbb', '#0077b6', '#00b4d8', '#02c39a', '#caf0f8', 'black');
    darkMode = false;
  } else {
    setTheme('#222222', 'black', '#505050', '#ff9500', '#d4d4d2', 'white');
    darkMode = true;
  }
});

setTheme('#f5dfbb', '#0077b6', '#00b4d8', '#02c39a', '#caf0f8', 'black');
