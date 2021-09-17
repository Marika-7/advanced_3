'use strict';

//+ variables
const form1 = document.forms[0];
const calculator = new SmartCalculator(form1.previous, form1.current);

//+ onclick for buttons
form1.clear.onclick = () => calculator.clear();

form1.delete.onclick = () => calculator.delete();

form1.number.forEach(element => {
	element.onclick = (event) => 
		calculator.appendNumber(event.target.textContent);
});

form1.operator.forEach(element => {
	element.onclick = (event) => 
		calculator.chooseOperator(event.target.textContent);
});

//+ onkeydown
form1.current.onkeydown = (event) => calculator.keyboard(event.key);

//+ oninput
form1.current.oninput = () => calculator.changeSize();

// строки для перевірки
// 2 + 2 * 3 - 6 / 2 // 5
// 2 + 2 * (2 + 1) - 6 / 2 // 5
// 2 + 2 * (2 + 1) - 6 / (4 - 2) // 5
// 5 + 2 * (4 + (6 - 3) * 2) // 25
// 1 + 2 * (3 + 4 * (5 + 6 * (7 + 8 * 9))) // 3839
// 1 + 2 * (3 + 4 * (5 + 6 * (7 + 8 * 9)) * (2 + 3)) // 3839
