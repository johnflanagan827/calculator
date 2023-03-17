// CONSTANTS
const output = document.getElementById("output");
const numbers = document.querySelectorAll(".number");
const clear = document.getElementById("clear");
const divide = document.getElementById("divide");
const multiply = document.getElementById("multiply");
const subtract = document.getElementById("subtract");
const add = document.getElementById("add");
const equals = document.getElementById("equals");
const percent = document.getElementById("percent");
const plusMinus = document.getElementById("plus-minus");
const slider = document.getElementById("switch");

// VARIABLES
let leftOperand = 0;
let rightOperand = 0;
let currOperation;
let chained = false;
let clearDisplay = false;
let enterStatus = false;
let darkMode = false;

// FUNCTIONS

// performs calculator operation
function calculate(leftOperand, rightOperand, currOperation) {
  if (isNaN(leftOperand)) {
    return "Error";
  }

  let result;
  if (currOperation === "/") {
    if (output.textContent === "0") {
      result = "Error";
    } else {
      result = leftOperand / rightOperand;
    }
  } else if (currOperation === "*") {
    result = leftOperand * rightOperand;
  } else if (currOperation === "-") {
    result = leftOperand - rightOperand;
  } else if (currOperation === "+") {
    result = leftOperand + rightOperand;
  }
  return formatResults(result);
}

// formats result properly for display
function formatResults(result) {
  if (result === Infinity) {
    result = "Error";
  }
  if (result.toString().length > 10) {
    result = result.toPrecision(10);
    if (result.includes("e")) {
      let e = result.substring(result.indexOf("e"));
      result = result.substring(0, 10 - e.length) + e;
    } else {
      result = result.substring(0, 10);
    }
  }
  return result;
}

// performs operation of specified operator
function performOperation(operator) {
  if (chained) {
    rightOperand = output.textContent;
    output.textContent = calculate(
      parseFloat(leftOperand),
      parseFloat(output.textContent),
      currOperation
    );
    leftOperand = output.textContent;
  } else {
    leftOperand = output.textContent;
  }
  chained = true;
  enterStatus = false;
  clearDisplay = true;
  currOperation = operator;
}

// performs equal operation
function performEqual() {
  if (!enterStatus) {
    rightOperand = output.textContent;
  }
  output.textContent = calculate(
    parseFloat(leftOperand),
    parseFloat(rightOperand),
    currOperation
  );
  leftOperand = output.textContent;
  enterStatus = true;
  chained = false;
}

// changes calculator theme
function changeTheme(
  htmlBackground,
  calculatorBackground,
  numberBackground,
  operationBackground,
  operationOtherBackground,
  dayNightColor
) {
  document.getElementsByTagName("html")[0].style.backgroundColor =
    htmlBackground;
  document.querySelectorAll(".container")[0].style.backgroundColor =
    calculatorBackground;
  document.querySelectorAll(".btn-row").forEach((e) => {
    e.style.backgroundColor = calculatorBackground;
  });
  document.getElementById("output").style.backgroundColor =
    calculatorBackground;
  document.querySelectorAll(".number").forEach((e) => {
    e.style.backgroundColor = numberBackground;
  });
  document.querySelectorAll(".operation").forEach((e) => {
    e.style.backgroundColor = operationBackground;
  });
  document.querySelectorAll(".operation-other").forEach((e) => {
    e.style.backgroundColor = operationOtherBackground;
  });
  document.querySelectorAll(".day-night").forEach((e) => {
    e.style.color = dayNightColor;
  });
}

// EVENT LISTENERS
numbers.forEach((e) => {
  e.addEventListener("click", () => {
    if (
      output.textContent === "0" ||
      output.textContent === "Error" ||
      clearDisplay
    ) {
      enterStatus = false;
      output.textContent = e.value;
      clearDisplay = false;
    } else if (output.textContent.length >= 9) {
      return;
    } else {
      if (!(e.value === "." && output.textContent.includes("."))) {
        output.textContent = output.textContent + e.value;
      }
    }
  });
  window.addEventListener("keypress", (event) => {
    if (event.key == e.value) {
      e.click();
    }
  });
});

clear.addEventListener("click", () => {
  enterStatus = false;
  chained = false;
  output.textContent = "0";
  leftOperand = 0;
});

divide.addEventListener("click", () => {
  performOperation("/");
});

multiply.addEventListener("click", () => {
  performOperation("*");
});

subtract.addEventListener("click", () => {
  performOperation("-");
});

add.addEventListener("click", () => {
  performOperation("+");
});

equals.addEventListener("click", () => {
  performEqual();
});

percent.addEventListener("click", () => {
  if (output.textContent !== "0") {
    output.textContent = calculate(parseFloat(output.textContent), 100, "/");
  }
});

plusMinus.addEventListener("click", () => {
  output.textContent = calculate(parseFloat(output.textContent), -1, "*");
});

window.addEventListener("keydown", (e) => {
  if (e.key === "/") {
    performOperation("/");
  } else if (e.key === "*") {
    performOperation("*");
  } else if (e.key === "-") {
    performOperation("-");
  } else if (e.key === "+") {
    performOperation("+");
  } else if (e.key === "Enter") {
    performEqual();
  } else if (e.key === "%") {
    if (output.textContent !== "0") {
      output.textContent = calculate(parseFloat(output.textContent), 100, "/");
    }
  } else if (e.key === "Backspace") {
    if (output.textContent.length === 1) {
      output.textContent = "0";
    } else if (output.textContent !== "Error") {
      output.textContent = output.textContent.substring(
        0,
        output.textContent.length - 1
      );
    }
  }
});

slider.addEventListener("click", () => {
  if (darkMode) {
    changeTheme("#f5dfbb", "#0077b6", "#00b4d8", "#02c39a", "#caf0f8", "black");
    darkMode = false;
  } else {
    changeTheme("#222222", "black", "#505050", "#ff9500", "#d4d4d2", "white");
    darkMode = true;
  }
});

changeTheme("#f5dfbb", "#0077b6", "#00b4d8", "#02c39a", "#caf0f8", "black");
