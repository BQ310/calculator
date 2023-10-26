function add(n1, n2) {
    return n1 + n2;
};

function subtract(n1, n2) {
    return n1 - n2;
};

function multiply(n1, n2) {
    return n1 * n2;
};

function divide(n1, n2) {
    return n1 / n2;
};

function operate(op1, op2, operand) {
    if (operand == '+') {
        return add(op1, op2);
    } else if (operand == '-') {
        return subtract(op1, op2);
    } else if (operand == '*') {
        return multiply(op1, op2);
    } else if (operand == '/') {
        return divide(op1, op2);
    }
};

sequence = [];

function updateDisplay() {
    const display = document.querySelector('.display');
    display.textContent = sequence.join('');
}

function setupNumpad() {
    const numpad = document.querySelector('.numpad');
    for (let i = 0; i < 10; i++) {
        const num = document.createElement('button');
        num.classList.toggle('number');
        num.textContent = i;
        num.addEventListener('click', () => {
            sequence.push(i);
            updateDisplay();
        });
        numpad.appendChild(num);
    }
};

function setupPlus() {
    
};

setupNumpad();


