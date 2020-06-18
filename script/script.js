let money = '21000';
let income = 'Upwork';
let addExpenses = 'Wife, Children, School, Travel';
let deposit = true;
let mission = 99999;
let period = 10;



console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log('Период равен', period, 'месяцев');
console.log("Цель заработать", mission, "рублей");
console.log(addExpenses.toLowerCase().split(' '));

let budgetDay = money / 30;
console.log(budgetDay);
let money = prompt('Ваш месячный доход?');
console.log(money);
