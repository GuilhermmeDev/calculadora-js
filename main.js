class Calculator {
	constructor() {
		this.operation = [];
		this.visor = window.document.getElementById("visorInfo");
		this.previousOperation = [];
		this.previousVisorOperation =
			window.document.getElementById("previousOperation");
		this.status;
	}

	showVisor() {
		this.visor.innerText = this.operation.join("");
	}

	readValues(digit) {
		if (digit === "." && String(this.operation).includes(".")) {
			return;
		}
		this.operation.push(digit);

		this.showVisor();
	}

	clearVisor() {
		this.operation = [];
		this.previousOperation = "";

		this.showPreviousOperation();
		this.showVisor();
	}

	handleOperations() {
		try {
			const result = eval(this.operation.join(""));
		} catch {
			this.visor.innerText = "Error";
			throw new Error("Calc Error");
		}

		const result = eval(this.operation.join(""));
		this.visor.innerText = result;

		this.previousOperation = this.operation.join("");
		this.showPreviousOperation();
		this.operation = [result];
		console.log(`${this.previousOperation} = ${result}`);
	}

	showPreviousOperation() {
		this.previousVisorOperation.innerText = this.previousOperation;
	}
}

const calc = new Calculator();

const listNums = Array.from(document.querySelectorAll(".button"));

listNums.map((element) => {
	element.addEventListener("click", (event) => {
		calc.readValues(event.target.value);
	});

	window.document.addEventListener("keypress", (event) => {
		if (event.key === element.value) {
			element.click();
		}
	});
});

window.document.addEventListener("keyup", (event) => {
	if (event.key === "Enter") {
		calc.handleOperations();
	} else if (event.key === "Backspace") {
		calc.clearVisor();
	}
});
