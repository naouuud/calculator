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

numbers.forEach(number => number.addEventListener('click', e => fillOperands(e)));
commands.forEach(command => command.addEventListener('click', e => selectOperator(e))); 
equals.addEventListener('click', e => calculate(e));
clear.addEventListener('click', clearCalc);

let initialized = false;
let opInitialized = false;
let fillB = false;
let calcFinished = false;
let operator;

function fillOperands(e) {
    if (calcFinished) clearCalc();
    if (!fillB) {
    if (!initialized) {
        operands.a = '';
        operands.a += e.target.id;
        display.textContent = operands.a;
        initialized = true;
    } else {
        operands.a += e.target.id;
        display.textContent = operands.a;
    }
    } else {
        operands.b += e.target.id;
        display.textContent = operands.b;
    }
}

function selectOperator(e) {
    if (!opInitialized) {
    operator = e.target.id;
    fillB = true;
    opInitialized = true;
    } else {
        calculate(e);
        operator = e.target.id;
        calcFinished = false;
    }
}

function calculate(e) {
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