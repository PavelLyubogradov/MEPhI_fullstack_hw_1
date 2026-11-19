const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// ---------- 1. Билетная касса ----------

function ticketPrice(category) {
  switch (category) {
    case 1:
      return 300;
    case 2:
      return 500;
    case 3:
      return 900;
    default:
      return 0;
  }
}

function maxTickets(budget, price) {
  // Без деления и округления: «покупаем» по одному билету, пока хватает денег.
  // Условие price > 0 защищает от бесконечного цикла при нулевой цене.
  let count = 0;
  let rest = budget;

  while (price > 0 && rest >= price) {
    rest -= price;
    count += 1;
  }

  return count;
}

function printTicketResult(category, budget) {
  const price = ticketPrice(category);

  if (price === 0) {
    console.log('неизвестная категория');
    return;
  }

  const count = maxTickets(budget, price);
  console.log(`Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${count} шт.`);
}

// ---------- 2. Доставка заказа ----------

function deliveryPrice(distance, total) {
  if (total >= 3000) {
    return 0;
  }

  if (distance <= 3) {
    return 0;
  }

  if (distance <= 10) {
    return 200;
  }

  return 200 + (distance - 10) * 25;
}

function printDelivery(distance, total) {
  const price = deliveryPrice(distance, total);
  console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${price} руб.`);
}

// ---------- 3. Лестница ----------

function printSteps(height) {
  let builtCount = 0;

  for (let step = 1; step <= height; step++) {
    if (step === 4) {
      continue;
    }

    if (step > 10) {
      console.log('Дальше лестница не построена');
      break;
    }

    console.log(`Ступень ${step}`);
    builtCount++;
  }

  console.log(`Всего построено: ${builtCount}`);
}

// ---------- Меню ----------

function askNumber(question, callback) {
  rl.question(question, (answer) => {
    callback(Number(answer));
  });
}

function runTicketOffice() {
  askNumber('Категория билета: ', (category) => {
    askNumber('Бюджет: ', (budget) => {
      printTicketResult(category, budget);
      rl.close();
    });
  });
}

function runDelivery() {
  askNumber('Расстояние: ', (distance) => {
    askNumber('Сумма заказа: ', (total) => {
      printDelivery(distance, total);
      rl.close();
    });
  });
}

function runStairs() {
  askNumber('Высота лестницы: ', (height) => {
    printSteps(height);
    rl.close();
  });
}

console.log('Выберите задачу:');
console.log('1 — билетная касса');
console.log('2 — доставка заказа');
console.log('3 — лестница');

rl.question('Ваш выбор: ', (choice) => {
  switch (choice.trim()) {
    case '1':
      runTicketOffice();
      break;
    case '2':
      runDelivery();
      break;
    case '3':
      runStairs();
      break;
    default:
      console.log('такой задачи нет');
      rl.close();
  }
});
