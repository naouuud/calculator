const operations = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
}

const operands = {
    a: '0',
    b: ''
}

function operate(a, b, operator) {
    return operations[operator](a, b);
}

const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const commands = document.querySelectorAll(".command");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const decimal = document.querySelector('.decimal');

numbers.forEach(number => number.addEventListener('click', e => fillOperands(e.target.id)));
commands.forEach(command => command.addEventListener('click', e => selectOperator(e.target.id))); 
equals.addEventListener('click', calculate);
clear.addEventListener('click', clearCalc);
decimal.addEventListener('click', e => inputDecimal(e.target.id));
document.addEventListener('keypress', e => sortKeys(e.key));

let initialized = false;
let opInitialized = false;
let fillB = false;
let calcFinished = false;
let operator;
let includesDecimal = false;

function inputDecimal(input) {
    if (includesDecimal) return;
    fillOperands(input);
    includesDecimal = true;
}

function fillOperands(input) {
    if (calcFinished) clearCalc();
    if (!fillB) {
    if (!initialized) {
        operands.a = '';
        operands.a += input;
        display.textContent = operands.a;
        initialized = true;
    } else {
        operands.a += input;
        operands.a = operands.a.substring(0, 12);
        display.textContent = operands.a;
    }
    } else {
        operands.b += input;
        operands.b = operands.b.substring(0, 12);
        display.textContent = operands.b;
    }
}

function selectOperator(input) {
    if (!opInitialized) {
    operator = input;
    fillB = true;
    opInitialized = true;
    includesDecimal = false;
    } else {
        calculate();
        operator = input;
        calcFinished = false;
        includesDecimal = false;
    }
}

function calculate() {
    if (operator) {
    a = parseFloat(operands.a);
    b = parseFloat(operands.b);
    if (isNaN(b)) return;
    if (b === 0 && operator === "divide") {
        clearCalc();
        display.textContent = "Can't divide by zero";
        return;
    }
    let result = (operate(a, b, operator));
    let resultString = result.toString().slice(0, 13); 
    display.textContent = resultString;
    if (result > 999999999999 || result < -999999999999) display.textContent = "Too large to display";
    operands.a = result;
    operands.b = '';
    operator = '';
    calcFinished = true;
    } else return;
}

function clearCalc() {
    operands.a = '0';
    operands.b = '';
    operator = '';
    initialized = false;
    opInitialized = false;
    fillB = false
    calcFinished = false;
    display.textContent = '';
    includesDecimal = false;
}

function sortKeys(key) {
    if (!isNaN(key)) fillOperands(key);
    else if (key === ".") inputDecimal(key);
    else if (key === "+") selectOperator("add");
    else if (key === "-") selectOperator("subtract");
    else if (key === "*") selectOperator("multiply");
    else if (key === "/") selectOperator("divide");
    else if (key === "Enter") calculate();
    else if (key === "Delete") clearCalc();
}