'use strict';

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    incomePlus = document.getElementsByTagName('button').item(0),
    expensesPlus = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),

// Элементы правой стороны
    budgetMonthValue = document.querySelector('.budget_month-value'),
    budgetDayValue = document.querySelector('.budget_day-value'),
    expensesMonthValue = document.querySelector('.expenses_month-value'),
    additionalIncomeValue = document.querySelector('.additional_income-value'),
    additionalExpensesValue = document.querySelector('.additional_expenses-value'),
    incomePeriodValue = document.querySelector('.income_period-value'),
    targetMonthValue = document.querySelector('.target_month-value'),

// Инпуты левой стороны
    salaryAmount = document.querySelector('input.salary-amount'),
    incomeTitle = document.querySelector('input.income-title'),
    expensesTitle = document.querySelector('input.expenses-title'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('input.target-amount'),
    periodSelect = document.querySelector('input.period-select'),
    expensesItems  = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');


const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = function (n) {
    return isNaN(parseFloat(n));
};

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    incomeMonth: 0,
    start: function () {

        this.budget = +salaryAmount.value;
        // console.log(salaryAmount.value);

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getTargetMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();

        this.showResult();
        this.theEnd();
    },
    theEnd: function() {
        let allDataInputs = document.querySelectorAll('.data input');
        allDataInputs.forEach(function(elem) {
            if (elem.nodeType === 'text') {
                elem.disabled = true;
            } 
        });
        start.style.display = 'none';
        cancel.style.display = 'block';
        cancel.addEventListener('click', appData.reset);
    },
    reset: function() {
        window.location.reload();
    },
    showResult: function() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', function() {
            incomePeriodValue.value = appData.calcPeriod();
        });
    },
    // Создание дополнительных блоков "Обязательные расходы"
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);

        expensesItems  = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);

        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    // Заполняет объект расходов с ключами: название статьи расхода - стоимость
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    getIncome: function() {
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = +cashIncome;
            }

        });

        for (const key in this.income){
            this.incomeMonth += +this.income[key];
        }
    },
    // Получение статей дополнительных расходов
    getAddExpenses: function() {
        let addExpenses = additionalExpensesItem.value.split(', ');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    // Получение статей дополнительных доходов
    getAddIncome: function() {
        additionalIncomeItem.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    // Вычисляет траты за месяц
    getExpensesMonth: function () {
        // Функция подсчитывает расходы за месяц
        let sum = 0;
        for (const key in this.expenses) {
            sum += this.expenses[key];
        }
        this.expensesMonth = sum;
    },
    getBudget: function () {
        // Функция вычисляет бюджет на месяц и на день
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.round(this.budgetMonth / 30);
    },
    // Функция возвращает период, за который будет достигнута цель
    getTargetMonth: function () {
        return targetAmount.value / this.budgetMonth;
    },
    getStatusIncome: function () {
        if (this.budgetDay > 1200) {
            return "У вас высокий уровень дохода";
        } else if (this.budgetDay > 600) {
            return "У вас средний уровень дохода";
        } else if (this.budgetDay < 0) {
            return "Что то пошло не так";
        } else {
            return "К сожалению, у вас уровень дохода ниже среднего";
        }
    },
    getInfoDeposit: function () {
        if (this.deposit) {
            do {
                this.percentDeposit = prompt("Какой годовой процент?", "10");
            } while (!isString(this.percentDeposit));
            do {
                this.moneyDeposit = prompt("Какая сумма депозита?", 10000);
            } while (!isNumber(this.moneyDeposit));
        }
    },
    calcPeriod: function () {
        return this.budgetMonth * periodSelect.value;
    },
    changePeriodAmount: function() {
        const periodAmount = document.querySelector('.period-amount');
        periodAmount.textContent = periodSelect.value;
    }
};

// Отключаем кнопку "Рассчитать"
start.disabled = true;

salaryAmount.addEventListener('input', () => {
    if (salaryAmount.value !== '') {
        start.disabled = false;
    } else {
        start.disabled = true;
    }
});
// Вешает обработчик на кнопку "Рассчитать"
start.addEventListener('click', appData.start.bind(appData));



// Вешает обработчик на кнопку "+" для добавления доп. блоков расходов
expensesPlus.addEventListener('click', appData.addExpensesBlock);

// Вешает обработчик на кнопку "+" для добавления доп. блоков доходов
incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input', appData.changePeriodAmount);

