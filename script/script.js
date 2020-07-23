'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};
let isString = function (str) {

    let pattern = /^[,а-яА-ЯёЁa-zA-Z]+$/;
    if (str === null) {
        return;
    }
    return pattern.test(str)
}



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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 100000,
    period: 12,
    budget: +money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {

        if(confirm('Есть ли у Вас дополнительный заработок?')){
            let itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
            let cashIncome = prompt('Сколько в месяц Вы на этом зарабатываете?', 10000);
            appData.income[itemIncome] = cashIncome;
        }
        let addExpenses = '';
            do {
                addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'интернет,театр,жкх');
            }while (!isString(addExpenses));
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        for (let i = 0; i < appData.addExpenses.length; i++) {
            appData.addExpenses[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].slice(1);
        }
        for (let i = 0; i < 2; i++) {
            let key = '';
            let count = 0;
            do {
                key = prompt('Введите обязательную статью расходов:', 'Садик');
            }while (!isString(key));
            do {
                count = prompt('Во сколько это обойдется?');
            } while (!isNumber(count));
            appData.expenses[key] = +count;
        }
        appData.deposit = confirm('Есть ли у Вас депозит в банке?');
    },
    getExpensesMonth: function () {
        appData.expensesMonth = 0;
        for (let elem in appData.expenses) {
            appData.expensesMonth += appData.expenses[elem];
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

    getInfoDeposit: function(){
        if(appData.deposit){
            let n = 0;
            let m = 0;
            do {
                n = prompt('Какой годовой процент?', 10);
            } while (!isNumber(n));
            appData.percentDeposit = +n;
            do {
                m = prompt('Какая сумма заложена?', 10000);
            } while (!isNumber(m));
            appData.moneyDeposit = +m;
        }
    },
    calcSavedMoney: function() {
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getInfoDeposit();
appData.calcSavedMoney();
console.log('Расходы за месяц: ', appData.expensesMonth);
console.log('Уровень дохода: ', appData.getStatusIncome());
console.log('Наша программа включает в себя данные: ');
for (let elem in appData) {
    console.log(elem, appData[elem]);
};

console.log(appData.addExpenses.join(', '));