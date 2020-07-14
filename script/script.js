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
    asking: function () {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у Вас депозит в банке?');
    },
    budget: +money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
}



let amount = 0;
let getExpensesMonth = function () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        appData.expenses[i] = prompt('Введите обязательную статью расходов:');
        let count = 0;
        do {
            count = prompt('Во сколько это обойдется?');
        } while (!isNumber(count));
        amount += +count;

        return amount;
    };

};


let getAccumulatedMonth = function () {
    if (!money) {
        money = 0;
    }
    return money - getExpensesAmount;
};
let accumulatedMonth = getAccumulatedMonth(money, appData.expenses);

let getTargetMonth = function () {
    return Math.ceil(appData.mission / appData.budgetMonth);
};

let budgetDay = function () {
    return Math.ceil(accumulatedMonth / 30);
}

console.log('Обязательные расходы за месяц: ', getExpensesMonth());

console.log('Бюджет на день: ', Math.floor(appData.budgetDay));

const getStatusIncome = (budget) => {
    if (appData.budgetDay === 1200) {
        console.log('У вас почти получилось попасть в группу с высокий уровень дохода! Постарайтесь лучше!');
    } else if (appData.budgetDay === 600) {
        console.log('У вас почти средний уровень дохода, но немного не хватает...');
    } else if (appData.budgetDay > 1200) {
        console.log('У вас высокий уровень дохода');
    } else if (appData.budgetDay < 1200 && appData.budgetDay > 600) {
        console.log('У вас средний уровень дохода');
    } else if (appData.budgetDay < 600) {
        console.log('К сожалению у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay <= 0) {
        console.log('Что то пошло не так');
    }
};
console.log('getStatusIncome(): ', getStatusIncome(appData.budgetDay));


appData.asking();
