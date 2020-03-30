let money = 124523, // доход за месяц
	income = 'фриланс', // доп. доход
	addExpenses = 'интернет, такси, коммуналка', // доп. расходы
	deposit = true,
	mission = 10000, // желаемый доход
	period = 12; // кол-во месяцев

// Вывод данных в консоль ---
console.log('money: ', typeof money);
console.log('income: ', typeof income);
console.log('deposit: ', typeof deposit);

console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев. Цель заработать ${mission} рублей/долларов/гривен/юани`)
console.log(addExpenses.toLowerCase().split(', '));
// ---
 
let budgetDay = money/30; // дневной бюджет
console.log(budgetDay);

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

// Вычисляем бюджет на месяц
let budgetMonth = money - (amount2 + amount1);
console.log('Бюджет на месяц: ', budgetMonth);

console.log(`Цель будет достигнута за ${Math.ceil(mission/budgetMonth)} месяцев`);

// Пересчитываем ежедневный бюджет
budgetDay = budgetMonth/30;
console.log('Бюджет на день: ', Math.floor(budgetDay));

// Работа с условиями
if (budgetDay > 1200) {
	console.log('У вас высокий уровень дохода')
} else if (budgetDay > 600) {
	console.log('У вас средний уровень дохода')
} else if (budgetDay < 0) {
	console.log('Что то пошло не так')
} else {
	console.log('К сожалению у вас уровень дохода ниже среднего')
}

