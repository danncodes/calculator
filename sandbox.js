// Calculator Class

class Calculator {
	constructor(previousOperandTextElement, currentOperandTextElement) {
		this.previousOperandTextElement = previousOperandTextElement;
		this.currentOperandTextElement = currentOperandTextElement;
		this.clear();
	}
	// Clear Function
	clear() {
		this.previousOperand = '';
		this.currentOperand = '';
		this.operation = undefined;
	}

	// Delete Function
	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}

	// Append Number Function
	appendNumber(number) {
		if (number === '.' && this.currentOperand.includes('.')) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	// Choose Operation Function
	chooseOperation(operation) {
		if (this.currentOperand === '') return;
		if (this.previousOperand !== '') {
			this.compute();
		}
		this.operation = operation;
		this.previousOperand = `${this.currentOperand} ${operation}`;
		this.currentOperand = '';
	}

	// Compute Function
	compute() {
		let comutation;
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);
		if (isNaN(prev) || isNaN(current)) return;

		switch (this.operation) {
			case '+':
				comutation = prev + current;
				break;
			case '-':
				comutation = prev - current;
				break;
			case '*':
				comutation = prev * current;
				break;
			case '÷':
				comutation = prev / current;
				break;
			default:
				return;
		}
		this.currentOperand = comutation;
		this.previousOperand = '';
		this.operation = undefined;
	}

	// Update Display Function
	updateDisplay() {
		this.currentOperandTextElement.innerText = this.currentOperand;
		this.previousOperandTextElement.innerText = this.previousOperand;
	}
}

// Selectiors

const numberButtons = document.querySelectorAll('.number');
const operationButtons = document.querySelectorAll('.operation');
const equalsButton = document.querySelector('.equals');
const deleteButton = document.querySelector('.delete');
const clearButton = document.querySelector('.all-clear');
const previousOperandTextElement = document.querySelector(
	'.data-previous-operand'
);
const currentOperandTextElement = document.querySelector(
	'.data-current-operand'
);

// Functions

const calculator = new Calculator(
	previousOperandTextElement,
	currentOperandTextElement
);

// Event Listeners

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});

equalsButton.addEventListener('click', () => {
	calculator.compute();
	calculator.updateDisplay();
});

clearButton.addEventListener('click', () => {
	calculator.clear();
	calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
	calculator.delete();
	calculator.updateDisplay();
});
