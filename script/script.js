// Спрашиваем у пользователя “Ваш месячный доход?” и результат сохраняем в переменную money
let money = prompt('Ваш месячный доход?');
let income = 'Upwork';
// Спросить у пользователя “Перечислите возможные расходы за рассчитываемый период через запятую” сохранить в переменную addExpenses
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
// Спросить у пользователя “Есть ли у вас депозит в банке?” и сохранить данные в переменной deposit (булево значение true/false)
let deposit = confirm('Есть ли у Вас депозит в банке?');
let mission = 100000;
let period = 12;
// Спросить у пользователя по 2 раза каждый вопрос и записать ответы в разные переменные 
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = prompt('Во сколько это обойдется?');


// 1) Объявить функцию getExpensesMonth. Функция возвращает сумму всех обязательных расходов за месяц
const getExpensesMonth = () {
    if (!amount1) {
        amount1 = 0;
    }
    if (!amount2) {
        amount2 = 0;
    }
    return amount1 + amount2;
};

// 2) Объявить функцию getAccumulatedMonth. Функция возвращает Накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = (money, getExpensesMonth) => {
    if (!money) {
        money = 0;
    }
    return money - getExpensesMonth;
};
// 3) Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth 
const accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth());

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
        console.log(`Цель будет достигнута за: ${getTargetMonth(mission, accumulatedMonth)} месяцев`);

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
