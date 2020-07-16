'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};

let money;

function start() {
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money));
}

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 100000,
    period: 12,
    budget: +money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    amount: [],
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у Вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
            appData.expenses[i] = prompt('Введите обязательную статью расходов:');
            let count = 0;
            do {
                count = prompt('Во сколько это обойдется?');
            } while (!isNumber(count));
            appData.amount.push(+count);
        }
        
    },
    getExpensesMonth:  function () {
        appData.expensesMonth = 0;
        for (let elem in appData.amount) {
            appData.expensesMonth += appData.amount[elem];
        }
    },
    getBudget: function () {
        if (!appData.budget) {
            appData.budget = 0;
        }
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);
    },
    getTargetMonth: function () {
        return Math.ceil(appData.mission / appData.budgetMonth);
    },
    getStatusIncome: function () {
        if (appData.budgetDay === 1200) {
            return 'У вас почти получилось попасть в группу с высокий уровень дохода! Постарайтесь лучше!';
        } else if (appData.budgetDay === 600) {
            return 'У вас почти средний уровень дохода, но немного не хватает...';
        } else if (appData.budgetDay > 1200) {
            return 'У вас высокий уровень дохода';
        } else if (appData.budgetDay < 1200 && appData.budgetDay > 600) {
            return 'У вас средний уровень дохода';
        } else if (appData.budgetDay < 600) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else if (appData.budgetDay <= 0) {
            return 'Что то пошло не так';
        }
    },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
console.log('Расходы за месяц: ', appData.expensesMonth);
console.log('Уровень дохода: ', appData.getStatusIncome());
console.log('Наша программа включает в себя данные: ');
for (let elem in appData) {
    console.log(elem, appData[elem]);
};
