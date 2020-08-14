'use strict';

let isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n)
};

let start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheck = document.querySelector('#deposit-check'),
    addIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
    addIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    addExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    addExpensesItem = document.querySelector('.additional_expenses-item'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodSelect = document.querySelector('.period-select');



let appData = {
    income: {},
    addIncome: [],
    incomeMonth: 0,
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    period: 12,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start: function () {
        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
        this.changePeriodSelect();

        this.showResult();
        if (start.textContent === 'Рассчитать') {
            this.blockInputs();
            start.textContent = 'Сбросить';
        } else {
            start.textContent = 'Рассчитать';
            this.reset();
        }
    },
    blockInputs: function (disabled = true) {
        document.querySelectorAll('.data input[type=text]').forEach(item => {
            item.disabled = disabled;
        });
    },
    reset: function () {
        appData = copyAppData;
        this.blockInputs(false);
        document.querySelectorAll('input[type=text]').forEach(item => {
            item.value = '';
        });
        this.getBudget();
        periodSelect.value = document.querySelector('.period-amount').textContent = 1;
        this.blockStart();
    },
    showResult: function () {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        addExpensesValue.value = this.addExpenses.join(',');
        addIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            expensesPlus.style.display = 'none';
        }
    },
    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            incomePlus.style.display = 'none';
        }
    },
    getExpenses: function (item) {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = +cashExpenses;
            }
        }.bind(this));
    },
    getIncome: function () {
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                this.income[itemIncome] = +cashIncome;
            }
        }.bind(this));

        for (let key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    },
    getAddExpenses: function () {
        let addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        }.bind(this));
    },
    getAddIncome: function () {
        addIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        }.bind(this));
    },
    getExpensesMonth: function () {
        this.expensesMonth = 0;
        for (let elem in this.expenses) {
            this.expensesMonth += this.expenses[elem];
        }
    },
    getBudget: function () {
        this.budget = +salaryAmount.value;
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.floor(this.budgetMonth / 30);
    },
    getTargetMonth: function () {
        return Math.ceil(targetAmount.value / this.budgetMonth);

    },
    getStatusIncome: function () {
        if (this.budgetDay === 1200) {
            return 'У вас почти получилось попасть в группу с высокий уровень дохода! Постарайтесь лучше!';
        } else if (this.budgetDay === 600) {
            return 'У вас почти средний уровень дохода, но немного не хватает...';
        } else if (this.budgetDay > 1200) {
            return 'У вас высокий уровень дохода';
        } else if (this.budgetDay < 1200 && this.budgetDay > 600) {
            return 'У вас средний уровень дохода';
        } else if (this.budgetDay < 600) {
            return 'К сожалению у вас уровень дохода ниже среднего';
        } else if (this.budgetDay <= 0) {
            return 'Что то пошло не так';
        }
    },
    getInfoDeposit: function () {
        // if (this.deposit) {
        //     let n = 0;
        //     do {
        //         n = prompt('Какой годовой процент?', '10');
        //     } while (!isNumber(n));
        //     this.percentDeposit = +n;
        //     do {
        //         this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        //     } while (!isNumber(n));
        //     this.moneyDeposit = +n;
        // }
        this.moneyDeposit = 0;
    },
    calcPeriod: function () {
        return this.budgetMonth * periodSelect.value;

    },
    changePeriodSelect: function () {
        let periodAmount = document.querySelector('.period-amount');
        periodAmount.textContent = periodSelect.value;
        incomePeriodValue.value = appData.calcPeriod();
    },

    blockStart: function () {
        start.disabled = !salaryAmount.value.trim();
    },
};
let copyAppData = Object.assign({}, appData);


const foo = appData.start.bind(appData);

appData.blockStart();
start.addEventListener('click', foo);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriodSelect);
salaryAmount.addEventListener('input', appData.blockStart);
// console.log('Расходы за месяц: ', this.expensesMonth);
// console.log('Уровень дохода: ', this.getStatusIncome());
// console.log('Наша программа включает в себя данные: ');
// for (let elem in this) {
//     console.log(elem, this[elem]);
// };




