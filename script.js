let money = 124523, // доход за месяц
	income = 'фриланс', // доп. доход
	addExpenses = 'интернет, такси, коммуналка', // доп. расходы
	deposit = true,
	mission = 1, // желаемый доход
	period = 12; // кол-во месяцев

console.log('money: ', typeof money);
console.log('income: ', typeof income);
console.log('deposit: ', typeof deposit);

console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев. Цель заработать ${mission} рублей/долларов/гривен/юани`)
console.log(addExpenses.toLowerCase().split(', '));
 
let budgetDay = money/30; // дневной бюджет
console.log(budgetDay);