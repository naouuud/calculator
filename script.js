add = (a, b) => a + b;
subtract = (a, b) => a - b;
multiply = (a, b) => a * b;
divide = (a, b) => a / b;

function operate(operator, a, b) {
    return operator(a, b);
}

const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");