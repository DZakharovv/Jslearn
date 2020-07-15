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
    // amount: 0,
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
            return +count;
        };
        getExpensesMonth = function () {
            appData.expensesMonth = 0;
            for (let elem in appData.expenses) {
                appData.expensesMonth += appData.expenses[elem];
            }
        },
        getBudget = function () {
            if (!appData.budget) {
                appData.budget = 0;
            }
            appData.budgetMonth = appData.budget - appData.expensesMonth;
            appData.budgetDay = Math.floor(appData.budgetMonth / 30);
        },
        getTargetMonth = function () {
            return Math.ceil(appData.mission / appData.budgetMonth);
        },
        getStatusIncome = function () {
            if (appData.budgetDay === 1200) {
            } else if (appData.budgetDay === 600) {
            } else if (appData.budgetDay > 1200) {
            } else if (appData.budgetDay < 1200 && appData.budgetDay > 600) {
            } else if (appData.budgetDay < 600) {
            } else if (appData.budgetDay <= 0) {
            }
        };
    },
};

// console.log('Обязательные расходы за месяц: ', getExpensesMonth());


// const getStatusIncome = (budget) => {
//     if (appData.budgetDay === 1200) {
//         console.log('У вас почти получилось попасть в группу с высокий уровень дохода! Постарайтесь лучше!');
//     } else if (appData.budgetDay === 600) {
//         console.log('У вас почти средний уровень дохода, но немного не хватает...');
//     } else if (appData.budgetDay > 1200) {
//         console.log('У вас высокий уровень дохода');
//     } else if (appData.budgetDay < 1200 && appData.budgetDay > 600) {
//         console.log('У вас средний уровень дохода');
//     } else if (appData.budgetDay < 600) {
//         console.log('К сожалению у вас уровень дохода ниже среднего');
//     } else if (appData.budgetDay <= 0) {
//         console.log('Что то пошло не так');
//     }
// };
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
console.log('Расходы за месяц: ', appData.expensesMonth);
console.log('Уровень дохода: ', appData.getStatusIncome());
console.log('Наша программа включает в себя данные: ');
for (let elem in appData) {
    console.log(elem, appData[elem]);
};
