'use strict';

//+ class SmartCalculator
class SmartCalculator extends Calculator {
	constructor(previousElement, currentElement) {
		super(previousElement, currentElement);
	}
// Enter викликає обробку введеної строки
	keyboard(key) {
		if(key === 'Enter') {
			this.calculateString();
		}
	}
	// викликає searchBrackets() для обробки строки
	calculateString() {
		this.currentElement.value = this.searchBrackets(this.currentElement.value);
		this.changeSize();
	}
	// приймає строку, вираз внутри дужок передає в getResult(), отриманий результат підставляє на місце виразу в дужках
	searchBrackets (string) {
		let open = string.lastIndexOf('(');
		let close;
		let result;
		while(open !== -1) {
			close = string.indexOf(')', open + 1);
			let substring = string.slice(open, close + 1);
			result = this.getResult(substring);
			string = string.replace(substring, result);
			open = string.lastIndexOf('(');
		}
		result = this.getResult(string);
		return result;
	}
	// приймає строку (без дужок), обчислює рузультат з урахуванням приоритетов, повертає результат
	getResult(string) {
		let array = this.stringToNumbers(string);
		for(let i = 0; i < array.length; i++) {
			if(array[i] === '*') {
				array.splice(i-1, 3, (array[i-1] * array[i+1]));
			}
			if(array[i] === '/') {
				array.splice(i-1, 3, (array[i-1] / array[i+1]));
			}
		}
		for(let i = 0; i < array.length; i++) {
			if(array[i] === '+') {
				array.splice(i-1, 3, (array[i-1] + array[i+1]));
			}
			if(array[i] === '-') {
				array.splice(i-1, 3, (array[i-1] - array[i+1]));
			}
		}
		return array[0];
	}
	// приймає строку, преобразує її в масив операндов і операторов, повертає масив
	stringToNumbers(string) {
		string += '=';
		let arrayNumbers = [];
		let operand = '';
		let operator = '';
		for(let i = 0; i < string.length; i++) {
			if(string[i].match(/[\d.]/)) {
				operand += string[i];
			}
			else {
				if(operand !== '') {
					arrayNumbers.push(parseFloat(operand));
					operand = ''; 
				}
				if(string[i].match(/^[-*+\/]$/)) {
					operator += string[i];
				}
				else if(operator !== '') {
					arrayNumbers.push(operator);
					operator = ''; 
				}
			}
		}
		return arrayNumbers;
	}
}
