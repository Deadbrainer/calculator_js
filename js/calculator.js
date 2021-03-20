class Calculator {
    constructor() {
        this.result = 0;
        this.displayValue = "0";
        this.history = "";
    }

    updateDisplay() {
        const display = document.querySelector('.calculator__display');
        display.value = this.displayValue;
    }

    inputDigit(digit) {
        const { displayValue } = this;
        this.displayValue = displayValue === '0' ? digit : displayValue + digit;
        this.updateDisplay();
    }

    inputDecimal(dot) {
        if (!this.displayValue.includes(dot)) {
            this.displayValue += dot;
            this.updateDisplay();
        }
    }

    inputAction(operator) {
        if (calc.displayValue[this.displayValue.length - 1] != "+" && this.displayValue[calc.displayValue.length - 1] != "-" && calc.displayValue[this.displayValue.length - 1] != "*" && this.displayValue[calc.displayValue.length - 1] != "/") {
            this.displayValue += operator;
            this.updateDisplay();
        }
    }

    rotate() {
        if (this.displayValue[0] == '-') {
            this.displayValue = this.displayValue.replace(this.displayValue[0], "");
        }
        else {
            this.displayValue = this.displayValue.replace(/^/, "-");
        }
        this.updateDisplay();
    }

    handleOperation() {
        this.displayValue = document.querySelector('.calculator__display').value;
        if (this.displayValue == "" || this.displayValue == null) {
            return;
        }
        if (this.displayValue.match(/[A-Za-z]/)) {
            this.displayValue = "Error";
            return this.updateDisplay();
        }
        let history = document.getElementById("history");
        this.history = this.displayValue;
        history.innerText = this.history;
        let strPrev = "";
        let strNext = "";
        for (let i = 0; i < this.displayValue.length; i++) {
            if (this.displayValue[i] == "^") {
                for (let j = i - 1; j >= 0; j--) {
                    if (this.displayValue[j] == "+" || this.displayValue[j] == "-" || this.displayValue[j] == "/" || this.displayValue[j] == "*") {
                        break;
                    }
                    strPrev += this.displayValue[j];
                }
            }
        }
        for (let i = 0; i < this.displayValue.length; i++) {
            if (this.displayValue[i] == "^") {
                for (let g = i + 1; g < this.displayValue.length; g++) {
                    if (this.displayValue[g] == "+" || this.displayValue[g] == "-" || this.displayValue[g] == "/" || this.displayValue[g] == "*") {
                        break;
                    }
                    strNext += this.displayValue[g];
                }
            }
        }
        let newstr = strPrev.split("").reverse().join("");
        let pow = Math.pow(newstr, strNext);
        this.displayValue = this.displayValue.replace(newstr + "^" + strNext, pow);
        this.result = eval(this.displayValue);
        this.displayValue = this.result.toString();
        this.updateDisplay();
    }

    sqrt() {
        this.handleOperation();
        if (this.displayValue == "" || this.displayValue == null || this.displayValue == "Error") {
            return;
        }
        this.displayValue = Math.sqrt(this.result).toString();
        this.updateDisplay();
    }

    fact() {
        this.handleOperation();
        if (this.displayValue == "" || this.displayValue == null || this.displayValue == "Error") {
            return;
        }
        this.displayValue = this.factorial(this.result).toString();
        this.updateDisplay();
    }

    factorial(n) {
        return (n != 1) ? n * this.factorial(n - 1) : 1;
    }

    addMS() {
        let strPrev = "";
        let strNext = "";
        for (let i = 0; i < this.displayValue.length; i++) {
            if (this.displayValue[i] == "^") {
                for (let j = i - 1; j >= 0; j--) {
                    if (this.displayValue[j] == "+" || this.displayValue[j] == "-" || this.displayValue[j] == "/" || this.displayValue[j] == "*") {
                        break;
                    }
                    strPrev += this.displayValue[j];
                }
            }
        }
        for (let i = 0; i < this.displayValue.length; i++) {
            if (this.displayValue[i] == "^") {
                for (let g = i + 1; g < this.displayValue.length; g++) {
                    if (this.displayValue[g] == "+" || this.displayValue[g] == "-" || this.displayValue[g] == "/" || this.displayValue[g] == "*") {
                        break;
                    }
                    strNext += this.displayValue[g];
                }
            }
        }
        let newstr = strPrev.split("").reverse().join("");
        let pow = Math.pow(newstr, strNext);
        let toMem = this.displayValue.replace(newstr + "^" + strNext, pow);
        let memRes = eval(toMem);
        localStorage.setItem('result', memRes.toString());
    }

    clearMC() {
        localStorage.removeItem('result');
    }

    readMR() {
        let mr = localStorage.getItem('result');
        this.displayValue = mr;
        this.updateDisplay();
    }

    backSpace() {
        this.displayValue = this.displayValue.slice(0, this.displayValue.length - 1);
        this.updateDisplay();
    }

    clear() {
        this.displayValue = "";
        this.updateDisplay();
    }
}

class Convertor {
    constructor() {
        this.displayGrams;
        this.displayKilograms;
        this.displayTons;
    }

    updateDisplay() {
        const displayGrams = document.querySelector('.calculator__output_grams');
        const displayKilograms = document.querySelector('.calculator__output_kilograms');
        const displayTons = document.querySelector('.calculator__output_tons');
        displayGrams.value = this.displayGrams;
        displayKilograms.value = this.displayKilograms;
        displayTons.value = this.displayTons;
    }

    converVeight() {
        let grams = document.querySelector('.calculator__display_grams').value;
        let kiloGrams = document.querySelector('.calculator__display_kilograms').value;
        let tons = document.querySelector('.calculator__display_tons').value;
        if (grams == "" && kiloGrams == "" && tons == "") {
            return;
        }
        if (grams.match(/[A-Za-z]/)) {
            this.displayGrams = "Error";
            return this.updateDisplay();
        }
        if (kiloGrams.match(/[A-Za-z]/)) {
            this.displayKilograms = "Error";
            return this.updateDisplay();
        }
        if (kiloGrams.match(/[A-Za-z]/)) {
            this.displayTons = "Error";
            return this.updateDisplay();
        }

        if (grams != "") {
            this.displayGrams = grams;
            this.displayKilograms = grams * 1000;
            this.displayTons = this.displayKilograms * 1000;
        }
        else if (kiloGrams != "") {
            this.displayGrams = kiloGrams / 1000;
            this.displayKilograms = kiloGrams;
            this.displayTons = kiloGrams * 1000;
        }
        else if (tons != "") {
            this.displayGrams = this.displayKilograms / 1000;
            this.displayKilograms = tons / 1000;
            this.displayTons = tons;
        }

        document.querySelector('.calculator__display_grams').value = "";
        document.querySelector('.calculator__display_kilograms').value = "";
        document.querySelector('.calculator__display_tons').value = "";
        this.updateDisplay();
    }
}

let calc = new Calculator();
let conv = new Convertor();
const keys = document.querySelector('.calculator__form');

function showAdvance() {
    document.querySelector('.advance__button').classList.toggle("active");
    document.querySelector('.calculator__advance').classList.toggle("active");
}

keys.addEventListener('click', (event) => {
    handler(event);
});

keys.addEventListener('keydown', (event) => {
    if (event.key == "Enter") {
        handler(event);
    }
});

document.getElementsByClassName('covert_veight')[0].onclick = () => {
    document.getElementById("basic").style.display = "none";
    document.getElementsByClassName('convertor')[0].style.display = "flex";
}

document.getElementsByClassName('basic')[0].onclick = () => {
    document.getElementById("basic").style.display = "block";
    document.getElementsByClassName('convertor')[0].style.display = "none";
}

function handler(event) {
    const { target } = event;

    if (!target.matches('input')) {
        return;
    }

    if (target.matches('input')) {
        if (calc.displayValue == "Error") {
            calc.displayValue = "";
            calc.updateDisplay();
        }
    }

    if (target.classList.contains('calculator__display')) {
        if (calc.displayValue == "Error") {
            calc.displayValue = "";
            calc.updateDisplay();
        }
        if (event.key == "Enter") {
            calc.handleOperation();
        }
        return;
    }

    if (target.classList.contains('calculator__display_grams')) {
        if (conv.displayGrams == "Error") {
            conv.displayGrams = "";
            conv.updateDisplay();
        }
        if (event.key == "Enter") {
            conv.displayGrams = "";
            conv.displayKilograms = "";
            conv.displayTons = "";
            conv.converVeight();
        }
        return;
    }

    if (target.classList.contains('calculator__display_kilograms')) {
        if (conv.displayKilograms == "Error") {
            conv.displayKilograms = "";
            conv.updateDisplay();
        }
        if (event.key == "Enter") {
            conv.displayGrams = "";
            conv.displayKilograms = "";
            conv.displayTons = "";
            conv.converVeight();
        }
        return;
    }

    if (target.classList.contains('calculator__display_tons')) {
        if (conv.displayTons == "Error") {
            conv.displayTons = "";
            conv.updateDisplay();
        }
        if (event.key == "Enter") {
            conv.displayGrams = "";
            conv.displayKilograms = "";
            conv.displayTons = "";
            conv.converVeight();
        }
        return;
    }

    if (target.classList.contains('calculator__display_convert')) {
        return;
    }

    if (target.classList.contains('basic')) {
        return;
    }

    if (target.classList.contains('covert_veight')) {
        return;
    }

    if (target.classList.contains('calculator__key_actions')) {
        calc.inputAction(target.value);
        return;
    }

    if (target.classList.contains('calculator__decimal')) {
        calc.inputDecimal(target.value);
        return;
    }

    if (target.classList.contains('calculator__clear')) {
        calc.clear();
        return;
    }

    if (target.classList.contains('calculator__key--equal')) {
        calc.handleOperation();
        return;
    }

    if (target.classList.contains('calculator__backspace')) {
        calc.backSpace();
        return;
    }

    if (target.classList.contains('calculator__change')) {
        calc.rotate();
        return;
    }

    if (target.classList.contains('calculator__sqrt')) {
        calc.sqrt();
        return;
    }

    if (target.classList.contains('calculator__factorial')) {
        calc.fact();
        return;
    }

    if (target.classList.contains('calculator__MS')) {
        calc.addMS();
        return;
    }

    if (target.classList.contains('calculator__MC')) {
        calc.clearMC();
        return;
    }

    if (target.classList.contains('calculator__MR')) {
        calc.readMR();
        return;
    }

    if (target.classList.contains('advance__button')) {
        showAdvance();
        return;
    }

    calc.inputDigit(target.value);
}
