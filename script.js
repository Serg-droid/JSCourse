let isNumber = function(n) {
	return !isNan(parseFloat(n)) && isFinite(n);
};

let money, // доход за месяц
	income = 'фриланс', // доп. доход
	addExpenses, // доп. расходы
	deposit,
	mission = 10000, // желаемый доход
	period = 12; // кол-во месяцев

let start = function() {
	do {
		money = prompt('Ваш месячный доход?');
	} while (!isNumber(money))
};

// Вывод данных в консоль ---

let showTypeOf = function(item) {
	console.log(item, typeof item);
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
// ---

// Получаем данные от пользователя
money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

// Статьи расходов ---
let expenses1 = [];
// ---

// Функция подсчитывает расходы за месяц
let getExpensesMonth = function() {
	let sum = 0;
	let rate;
	for (let i = 0; i < 2; i += 1) {  

		expenses[i] = prompt('Введите обязательную статью расходов');

		do {
			rate = prompt('Во сколько это обойдется?');
		} while (!isNumber(rate))
		sum += +rate;
	}

	return sum;
};

let expensesAmount = getExpensesMonth();

console.log('Расходы за месяц: ', expensesAmount);

// Вывод в консоль возможные расходы в виде массива 
console.log('Список расходов за месяц: ', addExpenses.split(', '));

// Функция вычисляет, сколько за месяц прибавляется деняк
let getAccumulatedMonth = function() {
	return money - expensesAmount;
};

// Сумма месячного накопления
let accumulatedMonth = getAccumulatedMonth();

// Функция возвращает период, за который будет достигнута цель
let getTargetMonth = function() {
	return mission/accumulatedMonth;
};

let targetMonth = getTargetMonth();

if (targetMonth < 0) {
	console.log(`Цель будет достигнута за ${} месяца`);
} else {
	console.log('Цель не будет достигнута');
}

// Пересчитываем ежедневный бюджет
budgetDay = accumulatedMonth/30;
console.log('Бюджет на день: ', Math.floor(budgetDay));

// Работа с условиями

let getStatusIncome = function() {
	if (budgetDay > 1200) {
		return('У вас высокий уровень дохода')
	} else if (budgetDay > 600) {
		return('У вас средний уровень дохода')
	} else if (budgetDay < 0) {
		return('Что то пошло не так')
	} else {
		return('К сожалению у вас уровень дохода ниже среднего')
	}
};

console.log(getStatusIncome());






