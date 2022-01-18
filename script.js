const displayTop = document.getElementById("display-top");

const displayBottom = document.getElementById("display-bottom");

// EVENT LISTENERS FOR 0-9 NUMBER CLICK

const changable = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine"
];

function handleNumberClick() {
  addBackEquals();
  switch (displayBottom.innerText) {
    case "0":
      displayBottom.innerText = this.innerText;
      displayTop.innerText =
        displayTop.innerText.slice(0, displayTop.innerText.length - 1) +
        this.innerText;
      break;
    case "/":
    case "X":
    case "-":
    case "+":
      displayBottom.innerText = this.innerText;
      displayTop.innerText += this.innerText;
      break;
    default:
      if (displayTop.innerText.indexOf("=") > -1) {
        displayBottom.innerText = this.innerText;
        displayTop.innerText = this.innerText;
      } else {
        displayBottom.innerText += this.innerText;
        displayTop.innerText += this.innerText;
      }
      break;
  }
}

for (let i = 0; i < changable.length; i++) {
  document
    .getElementById(changable[i])
    .addEventListener("click", handleNumberClick);
}

function handleZeroClick() {
  addBackEquals();
  switch (displayBottom.innerText) {
    case "0":
      if (displayTop.innerText == "0" || displayTop.innerText == "") {
        displayTop.innerText = "0";
        displayBottom.innerText = "0";
      }
      break;
    case "/":
    case "X":
    case "-":
    case "+":
      displayBottom.innerText = "0";
      displayTop.innerText += this.innerText;
      break;
    default:
      if (displayTop.innerText.indexOf("=") > -1) {
        displayBottom.innerText = this.innerText;
        displayTop.innerText = this.innerText;
      } else {
        displayTop.innerText += this.innerText;
        displayBottom.innerText += this.innerText;
      }
      break;
  }
}

document.getElementById("zero").addEventListener("click", handleZeroClick);

// EVENT LISTENER FOR 'CLEAR' BUTTON CLICK

document.getElementById("clear").addEventListener("click", function () {
  addBack();
  addBackEquals();
  displayTop.innerText = "";
  displayBottom.innerText = "0";
});

// LIMITER FOR NUMBER LENGTH

for (let i = 0; i < changable.length; i++) {
  document
    .getElementById(changable[i])
    .addEventListener("click", numberLimiter);
}

document.getElementById("zero").addEventListener("click", numberLimiter);

document.getElementById("decimal").addEventListener("click", numberLimiter);

function numberLimiter() {
  if (displayBottom.innerText.length == 16) {
    for (let i = 0; i < changable.length; i++) {
      document
        .getElementById(changable[i])
        .removeEventListener("click", handleNumberClick);
    }
    document
      .getElementById("zero")
      .removeEventListener("click", handleZeroClick);
    document
      .getElementById("decimal")
      .removeEventListener("click", handleDecimalClick);
  }
  if (displayBottom.innerText.length == 16 && this.click) {
    displayBottom.innerText = "REACHED MAX DIGIT";
    setTimeout(function () {
      if (displayTop.innerText == "") {
        displayBottom.innerText = "0";
      } else {
        displayBottom.innerText = displayTop.innerText.slice(
          displayTop.innerText.length - 16,
          displayTop.innerText.length
        );
      }
    }, 1000);
  }
}

// FUNCTION TO ADD BACK EVENT LISTENERS FOR NUMBERS

function addBack() {
  for (let i = 0; i < changable.length; i++) {
    document
      .getElementById(changable[i])
      .addEventListener("click", handleNumberClick);
  }
  document.getElementById("zero").addEventListener("click", handleZeroClick);
  document
    .getElementById("decimal")
    .addEventListener("click", handleDecimalClick);
}

// EVENT LISTENER FOR 'DECIMAL' BUTTON

function handleDecimalClick() {
  addBackEquals();
  if (displayBottom.innerText.indexOf(".") > -1 && this.click) {
  } else {
    switch (displayBottom.innerText) {
      case "/":
      case "X":
      case "-":
      case "+":
        displayTop.innerText += "0" + this.innerText;
        displayBottom.innerText = "0" + this.innerText;
        break;
      case "0":
        displayBottom.innerText += this.innerText;
        if (displayTop.innerText == "") {
          displayTop.innerText = "0" + this.innerText;
        } else {
          displayTop.innerText += this.innerText;
        }
        break;
      default:
        if (displayTop.innerText.indexOf("=") > -1) {
        displayBottom.innerText = '0' + this.innerText;
        displayTop.innerText = '0' + this.innerText;
        } else {
        displayBottom.innerText += this.innerText;
        displayTop.innerText += this.innerText;
        }
        break;
    }
  }
}

document
  .getElementById("decimal")
  .addEventListener("click", handleDecimalClick);

// EVENT LISTENER FOR 'MULTIPLY', 'DIVIDE' and 'ADD' BUTTON CLICK

function multiplyDivideAddClick() {
  addBack();
  addBackEquals();
  if(displayTop.innerText.includes('=')) {
    displayBottom.innerText = this.innerText;
    displayTop.innerText = lastResult;
  }
  if (displayBottom.innerText == 0 && displayTop.innerText == "") {
    displayTop.innerText = 0 + this.innerText;
    displayBottom.innerText = this.innerText;
  }
  switch (
    displayTop.innerText.slice(
      displayTop.innerText.length - 2,
      displayTop.innerText.length
    )
  ) {
    case "--":
    case "/-":
    case "X-":
    case "+-":
      displayBottom.innerText = this.innerText;
      displayTop.innerText =
        displayTop.innerText.slice(0, displayTop.innerText.length - 2) +
        this.innerText;
      break;
  }
  switch (displayTop.innerText[displayTop.innerText.length - 1]) {
    case "X":
    case "/":
    case "-":
    case "+":
      if (displayTop.innerText.length > 1) {
        displayBottom.innerText = this.innerText;
        displayTop.innerText =
          displayTop.innerText.slice(0, displayTop.innerText.length - 1) +
          this.innerText;
      }
      break;
    default:
      displayTop.innerText += this.innerText;
      displayBottom.innerText = this.innerText;
      break;
  }
}

document
  .getElementById("multiply")
  .addEventListener("click", multiplyDivideAddClick);
document
  .getElementById("divide")
  .addEventListener("click", multiplyDivideAddClick);
document
  .getElementById("add")
  .addEventListener("click", multiplyDivideAddClick);

// EVENT LISTENER FOR 'SUBTRACT' BUTTON CLICK

function handleSubtractClick() {
  addBack();
  addBackEquals();
  if(displayTop.innerText.includes('=')) {
    displayBottom.innerText = this.innerText;
    displayTop.innerText = lastResult;
  }
  switch (
    displayTop.innerText.slice(
      displayTop.innerText.length - 2,
      displayTop.innerText.length
    )
  ) {
    case "--":
    case "/-":
    case "X-":
    case "+-":
      return;
  }
  switch (displayTop.innerText) {
    case "":
    case "/":
    case "X":
    case "+":
      displayTop.innerText = this.innerText;
      displayBottom.innerText = this.innerText;
      break;
    case "-":
      break;
    default:
      displayTop.innerText += this.innerText;
      displayBottom.innerText = this.innerText;
      break;
  }
}

document
  .getElementById("subtract")
  .addEventListener("click", handleSubtractClick);

// EVENT LISTENER FOR 'EQUALS' BUTTON CLICK

function roundTo(number) {
  if (typeof number === 'number') {
    if (number.toString().split("").reverse().join("").indexOf('.') > 15) {
      if (number.toString().includes('e')) {
      return number.toExponential(10);
   }
      return number.toFixed(15);
    }
   if (number > 9999999999999999) {
     return number.toExponential(10);
   }
   if (number.toString().includes('e')) {
      return number.toExponential(10);
   }
   return number;
  } else {
    return number;
  }
}

var lastResult = undefined;

function equalsClick() {
  addBack();
  let operations = displayTop.innerText.slice().replaceAll("X", "*").replaceAll("--", "+");
  switch (
    displayTop.innerText.slice(
      displayTop.innerText.length - 2,
      displayTop.innerText.length
    )
  ) {
    case "--":
      let cut1 = operations.slice(0, operations.length - 1);
      displayBottom.innerText = roundTo(eval(cut1));
      displayTop.innerText =
        displayTop.innerText.slice(0, displayTop.innerText.length - 2) +
        this.innerText +
        roundTo(eval(cut1));
      lastResult = roundTo(eval(cut1));
      break;
    case "/-":
    case "X-":
    case "+-":
      let cut = operations.slice(0, operations.length - 2);
      displayBottom.innerText = roundTo(eval(cut));
      displayTop.innerText =
        displayTop.innerText.slice(0, displayTop.innerText.length - 2) +
        this.innerText +
        roundTo(eval(cut));
      lastResult = roundTo(eval(cut));
      break;
    default:
        switch (displayTop.innerText[displayTop.innerText.length - 1]) {
    case "X":
    case "/":
    case "+":
    case "-":
      let cut = operations.slice(0, operations.length - 1);
      displayBottom.innerText = roundTo(eval(cut));
      displayTop.innerText =
        displayTop.innerText.slice(0, displayTop.innerText.length - 1) +
        this.innerText +
        roundTo(eval(cut));
      lastResult = roundTo(eval(cut));
      document.getElementById("equals").removeEventListener("click", equalsClick);
      return;
    default:
      break;
  }
      displayBottom.innerText = roundTo(eval(operations));
      displayTop.innerText += this.innerText + roundTo(eval(operations));
      lastResult = roundTo(eval(operations));
      break;
  }
  document.getElementById("equals").removeEventListener("click", equalsClick);
}

document.getElementById("equals").addEventListener("click", equalsClick);

// FUNCTION TO ADD BACK EVEN LISTENER FOR 'EQUALS' BUTTON

function addBackEquals() {
  document.getElementById("equals").addEventListener("click", equalsClick);
}

// CSS STYLING -------------------------------------------

document.getElementById('buttons').addEventListener('click', function() {
  var horizontalAxis = displayTop.width;
  displayTop.scrollBy(1000, 0);
});