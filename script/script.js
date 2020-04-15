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

const AppData = function() {
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
}

AppData.prototype.start = function () {

    this.budget = +salaryAmount.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getTargetMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
    this.theEnd();
};

AppData.prototype.theEnd = function() {
    let allDataInputs = document.querySelectorAll('.data input');
    allDataInputs.forEach(function(elem) {
        if (elem.getAttribute('type') === 'text') {
            elem.disabled = true;
        } 
    });
    start.style.display = 'none';
    cancel.style.display = 'block';
    cancel.addEventListener('click', () => appData.reset.call(appData));
};

AppData.prototype.reset = function() {
    // Сброс всех значений
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
    // Очистка всех полей
    document.querySelectorAll('input').forEach((elem) => {
        elem.value = '';
    });
    periodSelect.value = '0';
    this.changePeriodAmount();
    // Замена кнопок "Сбросить"/"Рассчитать"
    cancel.style.display = 'none';
    start.style.display = 'block';
    // Отключаем кнопку "Рассчитать"
    start.disabled = true;
    // Удаление доп.блоков расходов/доходов
    for (let i = expensesItems.length - 1; i > 0; i--) {
        expensesItems[i].remove();
    }
    expensesPlus.style.display = 'block';
    for (let i = incomeItems.length - 1; i > 0; i--) {
        incomeItems[i].remove();
    }
    incomePlus.style.display = 'block';
    // Разблокировка инпутов
    let allDataInputs = document.querySelectorAll('.data input');
    allDataInputs.forEach(function(elem) {
        if (elem.getAttribute('type') === 'text') {
            elem.disabled = false;
        } 
    });
};

AppData.prototype.showResult = function() {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', function() {
        incomePeriodValue.value = _this.calcPeriod();
    });
};

// Создание дополнительных блоков "Обязательные расходы"
AppData.prototype.addExpensesBlock = function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true),
        cloneExpensesTitle = cloneExpensesItem.querySelector('.expenses-title'),
        cloneExpensesAmount = cloneExpensesItem.querySelector('.expenses-amount');

    cloneExpensesTitle.value = '';
    cloneExpensesAmount.value = '';

    cloneExpensesTitle.addEventListener('input', function() {
        cloneExpensesTitle.value = cloneExpensesTitle.value.replace(/[^А-Я,.; ]/i, '');
    });
    cloneExpensesAmount.addEventListener('input', function() {
        cloneExpensesAmount.value = cloneExpensesAmount.value.replace(/[^0-9]/, '');
    });
    
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);

    expensesItems  = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        expensesPlus.style.display = 'none';
    }
    
};

AppData.prototype.addIncomeBlock = function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true),
        cloneIncomeTitle = cloneIncomeItem.querySelector('.income-title'),
        cloneIncomeAmount = cloneIncomeItem.querySelector('.income-amount');

    cloneIncomeTitle.value = '';
    cloneIncomeAmount.value = '';

    cloneIncomeTitle.addEventListener('input', function() {
        cloneIncomeTitle.value = cloneIncomeTitle.value.replace(/[^А-Я,.; ]/i, '');
    });
    cloneIncomeAmount.addEventListener('input', function() {
        cloneIncomeAmount.value = cloneIncomeAmount.value.replace(/[^0-9]/, '');
    });
    
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);

    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
        incomePlus.style.display = 'none';
    }
};

// Заполняет объект расходов с ключами: название статьи расхода - стоимость
AppData.prototype.getExpenses = function() {
    const _this = this;
    expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            _this.expenses[itemExpenses] = +cashExpenses;
        }
    });
};

AppData.prototype.getIncome = function() {
    const _this = this;
    incomeItems.forEach(function(item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            _this.income[itemIncome] = +cashIncome;
        }

    });

    for (const key in this.income){
        this.incomeMonth += +this.income[key];
    }
};

// Получение статей дополнительных расходов
AppData.prototype.getAddExpenses = function() {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(', ');
    addExpenses.forEach(function(item) {
        item = item.trim();
        if (item !== '') {
            _this.addExpenses.push(item);
        }
    });
};

// Получение статей дополнительных доходов
AppData.prototype.getAddIncome = function() {
    const _this = this;
    additionalIncomeItem.forEach(function(item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            _this.addIncome.push(itemValue);
        }
    });
};

// Вычисляет траты за месяц
AppData.prototype.getExpensesMonth = function () {
    let sum = 0;
    for (const key in this.expenses) {
        sum += this.expenses[key];
    }
    this.expensesMonth = sum;
};

// Функция вычисляет бюджет на месяц и на день
AppData.prototype.getBudget = function () {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.round(this.budgetMonth / 30);
};

// Функция возвращает период, за который будет достигнута цель
AppData.prototype.getTargetMonth = function () {
    return targetAmount.value / this.budgetMonth;
};

AppData.prototype.getStatusIncome = function () {
    if (this.budgetDay > 1200) {
        return "У вас высокий уровень дохода";
    } else if (this.budgetDay > 600) {
        return "У вас средний уровень дохода";
    } else if (this.budgetDay < 0) {
        return "Что то пошло не так";
    } else {
        return "К сожалению, у вас уровень дохода ниже среднего";
    }
};

AppData.prototype.getInfoDeposit = function () {
    if (this.deposit) {
        do {
            this.percentDeposit = prompt("Какой годовой процент?", "10");
        } while (!isString(this.percentDeposit));
        do {
            this.moneyDeposit = prompt("Какая сумма депозита?", 10000);
        } while (!isNumber(this.moneyDeposit));
    }
},

AppData.prototype.calcPeriod = function () {
    return this.budgetMonth * periodSelect.value;
};

AppData.prototype.changePeriodAmount = function() {
    const periodAmount = document.querySelector('.period-amount');
    periodAmount.textContent = periodSelect.value;
};

AppData.prototype.eventListeners = function() {
    const _this = this;
    // Вешает обработчик на кнопку "Рассчитать"
    start.addEventListener('click', _this.start.bind(_this));

    // Валидация инпутов
    (function inputValidate() {
        let allDataInputs = document.querySelectorAll('.data input');
        allDataInputs.forEach((elem) => {
            if (elem.getAttribute('placeholder') === 'Наименование') {
                elem.addEventListener('input', function() {
                    elem.value = elem.value.replace(/[^А-Я,.; ]/i, '');
                });
            } else if (elem.getAttribute('placeholder') === 'Сумма') {
                elem.addEventListener('input', function() {
                    elem.value = elem.value.replace(/[^0-9]/, '');
                });
            }
        });
    })();


    // Вешает обработчик на кнопку "+" для добавления доп. блоков расходов
    expensesPlus.addEventListener('click', _this.addExpensesBlock.bind(_this));

    // Вешает обработчик на кнопку "+" для добавления доп. блоков доходов
    incomePlus.addEventListener('click', _this.addIncomeBlock.bind(_this));

    periodSelect.addEventListener('input', _this.changePeriodAmount.bind(_this));

};

const appData = new AppData();

appData.eventListeners();

// Отключаем кнопку "Рассчитать"
start.disabled = true;

salaryAmount.addEventListener('input', () => {
    if (salaryAmount.value !== '') {
        start.disabled = false;
    } else {
        start.disabled = true;
    }
});
