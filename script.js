let money = 124523, // доход за месяц
	income = 'фриланс', // доп. доход
	addExpenses = 'интернет, такси, коммуналка', // доп. расходы
	deposit = true,
	mission = 10000, // желаемый доход
	period = 12; // кол-во месяцев

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
expenses1 = prompt('Введите обязательную статью расходов');
amount1 = +prompt('Во сколько это обойдется?');

expenses2 = prompt('Введите обязательную статью расходов');
amount2 = +prompt('Во сколько это обойдется?');
// ---

// Функция подсчитывает расходы за месяц
let getExpensesMonth = function() {
	return amount2 + amount1;
};

console.log('Расходы за месяц: ', getExpensesMonth());

// Вывод в консоль возможные расходы в виде массива 
console.log('Список расходов за месяц: ', addExpenses.split(', '));

// Функция вычисляет, сколько за месяц прибавляется деняк
let getAccumulatedMonth = function() {
	return money - getExpensesMonth();
};

// Сумма месячного накопления
let accumulatedMonth = getAccumulatedMonth();

// Функция возвращает период, за который будет достигнута цель
let getTargetMonth = function() {
	return mission/accumulatedMonth;
};

console.log('Период: ', getTargetMonth());

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






