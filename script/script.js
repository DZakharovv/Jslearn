let isNumber = function (n) {
    return !isNan(parseFloat(n)) && isFinite(n);
};


// Спрашиваем у пользователя “Ваш месячный доход?” и результат сохраняем в переменную money
let money,
    income = 'Upwork';
// Спросить у пользователя “Перечислите возможные расходы за рассчитываемый период через запятую” сохранить в переменную addExpenses
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
// Спросить у пользователя “Есть ли у вас депозит в банке?” и сохранить данные в переменной deposit (булево значение true/false)
deposit = confirm('Есть ли у Вас депозит в банке?');
mission = 100000;
period = 12;
// Спросить у пользователя по 2 раза каждый вопрос и записать ответы в разные переменные 
let expenses1, expenses2;

let start = function() {
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money)); 
}

start();



// 1) Объявить функцию getExpensesMonth. Функция возвращает сумму всех обязательных расходов за месяц
const getExpensesMonth = () {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Во сколько это обойдется?');
        do {
            count = prompt('Во сколько это обойдется?');
        } while (!isNumber(count))
    }
    return sum;
};

let expensesAmount = getExpensesMonth();

// 2) Объявить функцию getAccumulatedMonth. Функция возвращает Накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = (money, gexpensesAmount) => {
    if (!money) {
        money = 0;
    }
    return money - gexpensesAmount;
};
// 3) Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth 
const accumulatedMonth = expensesAmount(money, expensesAmount());

// 4) Объявить функцию getTargetMonth. Подсчитывает за какой период будет достигнута цель, зная результат месячного накопления (accumulatedMonth) и возвращает результат
const getTargetMonth = (mission, budgetMonth) => {
    return Math.ceil(mission / budgetMonth);
};

// 6) budgetDay высчитываем исходя из значения месячного накопления (accumulatedMonth)
const budgetDay = (accumulatedMonth, 30) => {
    return Math.ceil(accumulatedMonth / 30);
}



const showTypeOf = (data) => {
        console.log(data, typeof (data));

        // Почистить консоль логи и добавить недостающие, должны остаться:
        //  - вызовы функции showTypeOf
        showTypeOf(money);
        showTypeOf(income);
        showTypeOf(deposit);

        //  - Расходы за месяц вызов getExpensesMonth
        console.log('Обязательные расходы за месяц: ', getExpensesMonth());

        //  - Вывод возможных расходов в виде массива (addExpenses)
        console.log(addExpenses.toLocaleLowerCase().split(', '));

        //  - Cрок достижения цели в месяцах (результат вызова функции getTargetMonth)
        if (getTargetMonth >= 0) {
            console.log(`Цель будет достигнута за: ${getTargetMonth(mission, accumulatedMonth)} месяцев`);
        } else if {
            console.log(`Цель не будет достигнута`);
        }

        //  - Бюджет на день
        console.log('Бюджет на день: ', Math.floor(budgetDay));

        //  - вызов функции getStatusIncome
        const getStatusIncome = (budget) => {
            if (budgetDay === 1200) {
                console.log('У вас почти получилось попасть в группу с высокий уровень дохода! Постарайтесь лучше!');
            } else if (budgetDay === 600) {
                console.log('У вас почти средний уровень дохода, но немного не хватает...');
            } else if (budgetDay > 1200) {
                console.log('У вас высокий уровень дохода');
            } else if (budgetDay < 1200 && budgetDay > 600) {
                console.log('У вас средний уровень дохода');
            } else if (budgetDay < 600) {
                console.log('К сожалению у вас уровень дохода ниже среднего');
            } else if (budgetDay <= 0) {
                console.log('Что то пошло не так');
            }
        };
        console.log('getStatusIncome(): ', getStatusIncome(budgetDay));
