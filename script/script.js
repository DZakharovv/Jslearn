// 2) Спрашиваем у пользователя “Ваш месячный доход?” и результат сохраняем в переменную money
let money = prompt('Ваш месячный доход?');
let income = 'Upwork';
// 3) Спросить у пользователя “Перечислите возможные расходы за рассчитываемый период через запятую” сохранить в переменную addExpenses
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
// 4) Спросить у пользователя “Есть ли у вас депозит в банке?” и сохранить данные в переменной deposit (булево значение true/false)
let deposit = confirm('Есть ли у Вас депозит в банке?');
let mission = 100000;
let period = 12;
// 5) Спросить у пользователя по 2 раза каждый вопрос и записать ответы в разные переменные 
let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = prompt('Во сколько это обойдется?');
let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = prompt('Во сколько это обойдется?');

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен', period, 'месяцев');
console.log("Цель заработать", mission, "рублей");
console.log(addExpenses.toLowerCase().split(' '));

// 6) Вычислить бюджет на месяц, учитывая обязательные расходы, сохранить в новую переменную budgetMonth и вывести результат в консоль

let budgetMonth = Number(money) - (Number(amount1) + Number(amount2));
if (isNaN(budgetMonth)) {
    console.log('Ошибка!');
} else {
    console.log('Бюджет на месяц: ', budgetMonth);
// 7) Зная budgetMonth, посчитать за сколько месяцев будет достигнута цель mission, вывести в консоль, округляя в большую сторону
console.log(`Цель будет достигнута за: ${Math.ceil(mission / budgetMonth)} месяцев`);

// 8)Поправить budgetDay учитывая бюджет на месяц, а не месячный доход. Вывести в консоль  округлив в меньшую сторону 

let budgetDay = budgetMonth / 30;
console.log('Бюджет на день: ', Math.floor(budgetDay));

// 9)Написать конструкцию условий (расчеты приведены в рублях)	
console.log(isNaN(budgetDay) ? 'Упс! Где-то закралась ошибка...' :
        (budgetDay < 0) ? 'Что то пошло не так' :
        (budgetDay < 600) ? 'Что то пошло не так' :
        (budgetDay === 600) ? 'У вас почти средний уровень дохода, но немного не хватает...' :
        (budgetDay < 1200) ? 'У вас средний уровень дохода' :
        (budgetDay === 1200) ? 'У вас почти получилось попасть в группу с высокий уровень дохода! Постарайтесь лучше!' :
        'У вас высокий уровень дохода');
}