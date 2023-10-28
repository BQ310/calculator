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

let sequence = [];

function updateDisplay() {
    const display = document.querySelector('.display');
    display.textContent = sequence.join('');
}

function clearDisplay() {
    sequence = [];
    const display = document.querySelector('.display');
    display.textContent = '';
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

function setupOps() {
    const ops = ['+', '-', '*', '/'];
    const operators = document.querySelector('.operators');
    for (let i = 0; i < 4; i++) {
        const op = document.createElement('button');
        op.textContent = ops[i];
        operators.appendChild(op);
        op.addEventListener('click', () => {
            sequence.push(ops[i]);
            updateDisplay();
        });
    }
};

function setupClear() {
    const calculator = document.querySelector('.calculator');
    const clear = document.createElement('button');
    clear.textContent = 'clear';
    calculator.appendChild(clear);
    clear.addEventListener('click', () => {
        clearDisplay();
    });
};

function combineNum(start) {
    let end = start;
    let total = 0;
    while (typeof(sequence[end]) == "number") {
        end++;
    }
    if (start == end) {
        return;
    }
    for (let i = end-1, j = 0; i >= start; i--, j++) {
        total += sequence[i] * Math.pow(10, j);
    }
    sequence.splice(start, end-start, total);
}

function setupEquals() {
    const operators = document.querySelector('.operators');
    const equals = document.createElement('button');
    equals.textContent = '=';
    equals.addEventListener('click', () => {

        let l = 0;
        let r = 2;
        let m = 1;

        let valid_ops = ['+', '-', '*', '/'];

        while (sequence.length > 2) {
            combineNum(l);
            combineNum(r);
            let op1 = sequence[l];
            let op2 = sequence[r];
            let operand = sequence[m];

            if (typeof(op1) != "number" || typeof(op2) != "number") {
                clearDisplay();
                return;
            }
            if (!valid_ops.includes(operand)) {
                clearDisplay();
                return;
            }
            
            let result = operate(op1, op2, operand);
            sequence.splice(0, 3, result);
        }

        updateDisplay();
    });
    operators.appendChild(equals);
}

setupNumpad();
setupOps();
setupClear();
setupEquals();
