const operations = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
}

function operate(a, b, operator) {
    return operations[operator](a, b);
}

const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".button");

buttons.forEach(button => button.addEventListener('click', e => calculate(e)));

let a;
let b;
let operator;

function calculate(e) {
    if (e.target.classList[1] == "number") {
        display.textContent += e.target.id;
    }
    else if (e.target.classList[1] == "command") {
        if (a === undefined) {
            a = parseInt(display.textContent);
            operator = e.target.id;
            display.textContent = '';
        }
        else {
            b = parseInt(display.textContent);
            display.textContent = operate(a, b, operator); 
        }
    }
}