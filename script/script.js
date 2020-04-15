'use strict';

const start = document.getElementById('start'),
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
    periodSelect = document.querySelector('input.period-select');

let expensesItems  = document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');


const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const isString = function (n) {
    return isNaN(parseFloat(n));
};

class AppData {
    constructor() {
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

    start() {

        this.budget = +salaryAmount.value;
    
        this.getExpInc();
        this.getExpensesMonth();
        this.getTargetMonth();
        this.getAddIncExp();
        this.getBudget();
    
        this.showResult();
        this.theEnd();
    }

    theEnd() {
        const allDataInputs = document.querySelectorAll('.data input');
        allDataInputs.forEach(function(elem) {
            if (elem.getAttribute('type') === 'text') {
                elem.disabled = true;
            } 
        });
        start.style.display = 'none';
        cancel.style.display = 'block';
        cancel.addEventListener('click', () => appData.reset.call(appData));
    }

    reset() {
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
        const allDataInputs = document.querySelectorAll('.data input');
        allDataInputs.forEach(function(elem) {
            if (elem.getAttribute('type') === 'text') {
                elem.disabled = false;
            } 
        });
    }

    showResult() {
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
    }

    addBlock() {
        const clone = (btn) => {
            const startStr = btn.classList.value.split(' ')[1].split('_')[0];
            let items = startStr === 'expenses' ? expensesItems : incomeItems;
            const cloneItem = items[0].cloneNode(true),
                cloneTitle = cloneItem.querySelector(`.${startStr}-title`),
                cloneAmount = cloneItem.querySelector(`.${startStr}-amount`);
    
            cloneTitle.value = '';
            cloneAmount.value = '';
        
            cloneTitle.addEventListener('input', function() {
                cloneTitle.value = cloneTitle.value.replace(/[^А-Я,.; ]/i, '');
            });
            cloneAmount.addEventListener('input', function() {
                cloneAmount.value = cloneAmount.value.replace(/[^0-9]/, '');
            });
            
            items[0].parentNode.insertBefore(cloneItem, btn);
        
            items = document.querySelectorAll(`.${startStr}-items`);
            if (items.length === 3) {
                btn.style.display = 'none';
            }
        };
        clone(this);
    }

    getExpInc() {
        const count = (item) => {
            const startStr = item.classList.value.split('-')[0];
            let itemTitle = item.querySelector(`.${startStr}-title`).value;
            let itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = +itemAmount;
            }
    
        };
        expensesItems  = document.querySelectorAll('.expenses-items');
        incomeItems = document.querySelectorAll('.income-items');

        incomeItems.forEach(count);
        expensesItems.forEach(count);

        for (const key in this.income){
            this.incomeMonth += +this.income[key];
        }
    }

    getAddIncExp() {
        const countMoney = (arrOfItems, acc) => {
            arrOfItems.forEach((item) => {
                if (typeof item !== 'string') {
                    item = item.value;
                }
                item = item.trim();
                if (item !== '') {
                    acc.push(item);
                }
            });
        };

        countMoney(additionalExpensesItem.value.split(', '), this.addExpenses);
        countMoney(additionalIncomeItem, this.addIncome);
    }

    getExpensesMonth() {
        let sum = 0;
        for (const key in this.expenses) {
            sum += this.expenses[key];
        }
        this.expensesMonth = sum;
    }

    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.round(this.budgetMonth / 30);
    }

    getTargetMonth() {
        return targetAmount.value / this.budgetMonth;
    }

    getStatusIncome() {
        if (this.budgetDay > 1200) {
            return "У вас высокий уровень дохода";
        } else if (this.budgetDay > 600) {
            return "У вас средний уровень дохода";
        } else if (this.budgetDay < 0) {
            return "Что то пошло не так";
        } else {
            return "К сожалению, у вас уровень дохода ниже среднего";
        }
    }

    getInfoDeposit() {
        if (this.deposit) {
            do {
                this.percentDeposit = prompt("Какой годовой процент?", "10");
            } while (!isString(this.percentDeposit));
            do {
                this.moneyDeposit = prompt("Какая сумма депозита?", 10000);
            } while (!isNumber(this.moneyDeposit));
        }
    }

    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    }

    changePeriodAmount() {
        const periodAmount = document.querySelector('.period-amount');
        periodAmount.textContent = periodSelect.value;
    }

    eventListeners() {
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
        expensesPlus.addEventListener('click', this.addBlock);
    
        // Вешает обработчик на кнопку "+" для добавления доп. блоков доходов
        incomePlus.addEventListener('click', this.addBlock);
    
        periodSelect.addEventListener('input', _this.changePeriodAmount.bind(_this));
    
        salaryAmount.addEventListener('input', () => {
            if (salaryAmount.value !== '') {
                start.disabled = false;
            } else {
                start.disabled = true;
            }
        });
    }
}

const appData = new AppData();

appData.reset();
appData.eventListeners();



