require('dotenv').config();
const {
  Telegraf,
  Markup,
} = require('telegraf');
const fetch = require('node-fetch');
const inlineKeyboard = require('./keyboard');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => ctx.reply(`Привет, ${ctx.message.from.first_name}!
Подробнее всего тебе  о Средиземье тебе расскажут книжки, введи /books, чтобы узнать их название.
Если же ты хочешь познакомиться с каким то конкретно персонажем, то введи /search. Если же ты просто хочешь отвлечься,
то напиши /chuck.`, inlineKeyboard));

bot.command('/search', (searchCtx) => {
  searchCtx.reply('Введи имя персонажа');
  bot.on('text', async (ctx) => {
    const reg = /^[a-z]+$/i;
    if (!ctx.message.text.match(reg)) {
      ctx.reply('Имена персонажей в моей записной книжке написаны на английском!');
      return;
    }
    const info = await fetch(`https://the-one-api.dev/v2/character?name=${ctx.message.text}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer RUIVamE6pyWD-arG2baK',
      },
    });

    const infoJson = await info.json();
    if (infoJson.docs.length === 0) {
      ctx.reply('Такого персонажа я не знаю :с');
    } else {
      let character = '';

      for (let el in infoJson.docs[0]) {
        if (el === '_id') {
          continue;
        }
        if (infoJson.docs[0][el] === '') {
          continue;
        }
        character += el + ': ' + infoJson.docs[0][el] + ',' + '\n';
      }
      ctx.reply(character);
    }
  });
});

bot.command('/books', async (ctx) => {
  const info = await fetch(`https://the-one-api.dev/v2/book`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer RUIVamE6pyWD-arG2baK',
    },
  });
  const infoJson = await info.json();

  let books = '';
  for (let key in infoJson.docs) {
    books += `${Number(key) + 1}. ` + infoJson.docs[key].name + '\n';
  }
  ctx.reply(books);
});

bot.command('/chuck', async (ctx) => {
  const response = await fetch('https://api.chucknorris.io/jokes/random', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const joke = await response.json();

  ctx.reply(joke.value);
});

bot.launch();

module.exports = {
  Markup,
};
