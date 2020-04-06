'use strict';

const isNumber = function (n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = function (n) {
	return isNaN(parseFloat(n));
};

let money; // доход за месяц
const start = function () {
	do {
		money = prompt('Ваш месячный доход?');
	} while (!isNumber(money))
	money = +money;
};

start();

let appData = {
	income: {},
	addIncome: [],
	expenses: {},
	addExpenses: [],
	deposit: false,
	percentDeposit: 0,
	moneyDeposit: 0,
	mission: 50000,
	period: 3,
	budget: money,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	asking: function () {

		if (confirm('Есть ли у Вас дополнительный источник заработка?')) {
			let itemIncome, cashIncome;
			do {
				itemIncome = prompt('Какой у Вас дополнительный заработок', 'Таксую');
			} while (!isString(itemIncome))
			do {
				cashIncome = +prompt('Сколько в месяц Вы на этом зарабатываете', 10000);
			} while (!isNumber(cashIncome))
			appData.income[itemIncome] = cashIncome;
		}

		let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
		appData.addExpenses = addExpenses.toLowerCase().split(', ');
		appData.deposit = confirm('Есть ли у вас депозит в банке?');
		for (let i = 0; i < 2; i += 1) {

			let state, rate;
			do {
				state = prompt('Введите обязательную статью расходов');
			} while (!isString(state))
			do {
				rate = prompt('Во сколько это обойдется?');
			} while (!isNumber(rate))
			appData.expenses[state] = +rate;
		}
	},
	getExpensesMonth: function () { // Функция подсчитывает расходы за месяц
		let sum = 0;
		for (const key in appData.expenses) {
			sum += appData.expenses[key];
		}
		appData.expensesMonth = sum;
	},
	getBudget: function () { // Функция вычисляет бюджет на месяц и на день
		appData.budgetMonth = appData.budget - appData.expensesMonth;
		appData.budgetDay = appData.budgetMonth / 30;
	},
	getTargetMonth: function () { // Функция возвращает период, за который будет достигнута цель
		appData.period = appData.mission / appData.budgetMonth;
	},
	getStatusIncome: function () {
		if (appData.budgetDay > 1200) {
			return ('У вас высокий уровень дохода')
		} else if (appData.budgetDay > 600) {
			return ('У вас средний уровень дохода')
		} else if (appData.budgetDay < 0) {
			return ('Что то пошло не так')
		} else {
			return ('К сожалению, у вас уровень дохода ниже среднего')
		}
	},
	getInfoDeposit: function () {
		if (appData.deposit) {
			do {
				appData.percentDeposit = prompt('Какой годовой процент?', '10');
			} while (!isString(appData.percentDeposit))
			do {
				appData.moneyDeposit = prompt('Какая сумма депозита?', 10000);
			} while (!isNumber(appData.moneyDeposit))
		}
	},
	calcSavedMoney: function () {
		return appData.budgetMonth * appData.period;
	},
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getTargetMonth();

// Вывод в консоль расходов за месяц
console.log('Расходы за месяц: ', appData.expensesMonth);

// Вывод в консоль период достижения цели
if (appData.period >= 0) {
	console.log(`Цель будет достигнута за ${appData.period} месяца`);
} else {
	console.log('Цель не будет достигнута');
}

// Выводит уровень дохода в консоль
console.log(appData.getStatusIncome());


console.log('Наша программа включает в себя данные: ')
for (const key in appData) {
	console.log(`${key} - ${appData[key]}`);
}

// Вывод в консоль возможных расходов
console.log(appData.addExpenses.map((item) => `${item[0].toUpperCase()}${item.slice(1, item.length)}`).join(', '))