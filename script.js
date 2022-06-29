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

numbers.forEach(number => number.addEventListener('click', e => fillOperands(e.target.id)));
commands.forEach(command => command.addEventListener('click', e => selectOperator(e.target.id))); 
equals.addEventListener('click', calculate);
clear.addEventListener('click', clearCalc);
document.addEventListener('keypress', e => sortKeys(e.key));

let initialized = false;
let opInitialized = false;
let fillB = false;
let calcFinished = false;
let operator;

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
        display.textContent = operands.a;
    }
    } else {
        operands.b += input;
        display.textContent = operands.b;
    }
}

function selectOperator(input) {
    if (!opInitialized) {
    operator = input;
    fillB = true;
    opInitialized = true;
    } else {
        calculate();
        operator = input;
        calcFinished = false;
    }
}

function calculate() {
    if (operator) {
    a = parseFloat(operands.a);
    b = parseFloat(operands.b);
    if (!b) return;
    let result = (operate(a, b, operator));
    display.textContent = result;
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
}

function sortKeys(key) {
    if (!isNaN(key)) fillOperands(key);
    else if (key === "+") selectOperator("add");
    else if (key === "-") selectOperator("subtract");
    else if (key === "*") selectOperator("multiply");
    else if (key === "/") selectOperator("divide");
    else if (key === "Enter") calculate();
    else if (key === "C" || key === "Delete") clearCalc();
}