const start = document.getElementById('start');
const btnPlus1 = document.getElementsByTagName('button').item(0);
const btnPlus2 = document.getElementsByTagName('button')[1];
const checkBox = document.querySelector('#deposit-check');
const additionalIncomeItem = document.querySelectorAll('.additional_income-item')

// Элементы правой стороны
const incomeMonthValue = document.querySelector('.budget_month-value');
const budgetDayValue = document.querySelector('.budget_day-value');
const expensesMonthValue = document.querySelector('.expenses_month-value');
const additionalIncomeValue = document.querySelector('.additional_income-value');
const additionalExpensesValue = document.querySelector('.additional_expenses-value');
const incomePeriodValue = document.querySelector('.income_period-value');
const targetMonthValue = document.querySelector('.target_month-value');

// Инпуты левой стороны
const putIncomeMonth = document.querySelector('input.salary-amount');
const putExtraIncomeItem = document.querySelector('input.income-title');
const putExtraIncomeAmount = document.querySelector('input.income-amount');
const putObligatoryExpensesItem = document.querySelector('input.expenses-title');
const putObligatoryExpensesAmount = document.querySelector('input.expenses-amount');
const putAdditionalExpensesItem = document.querySelector('.additional_expenses-item');
const putTargetMonth = document.querySelector('input.target-amount');
const periodRange = document.querySelector('input.period-select');