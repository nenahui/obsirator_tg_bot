const { Telegraf } = require('telegraf');

const token = process.env.TOKEN;

const bot = new Telegraf(token);

(async () => {
  try {
    const updates = await bot.telegram.getUpdates();
    if (updates.length > 0) {
      const lastUpdateId = updates[updates.length - 1].update_id;
      await bot.telegram.getUpdates({ offset: lastUpdateId + 1 });
    }
    console.log('Старые сообщения проигнорированы.');
  } catch (error) {
    console.error('Ошибка при игнорировании старых сообщений:', error);
  }

  try {
    await bot.launch();
    console.log('Bot started...');
  } catch (error) {
    console.error('Ошибка при запуске бота:', error);
  }
})();

const excludedChatIds = [2474916197];

const generalResponses = [
  'да что ты',
  'пиздабол',
  'я твое все ебал 🤬',
  'согласись, что Элина дурачек)',
  'ты че дурак?',
  'мал, жоголуп кетчи нары 😜',
  'Долбаеб чтоли',
  'ну правда же, что Сезимка умничка))',
  'твое место на дне пидор ты несчастный',
  'ебать ты тупой',
  'иди нахуй 😘',
  'эй чмо, молча наблюдай',
  'иди бля изолируйся от общества',
  'орнаменты?',
  'Как же хороша наша Ясми❤️',
  'я твой рот выебу',
  'сигилчи родной 😘',
  'далбан, эс алчы бар',
  'э башына хаям',
  'эшексин сен',
  'ты вообще в своем уме?',
  'дегенерат хренов',
  'умница 😘',
  'молодчина',
  'ты красивая 😉',
  'you изящная ☺️',
  'ты лучший 👏',
  'ты молодец 😊',
  'ты мудак',
  'ий жаным менин😜😘',
  'э жоголчу нары',
  'ну ты гнида',
  'деградируешь с каждым сообщением',
  'автомат менен олтруп салса',
  'фууууу',
  'криннннж',
  'позорище',
  'позор',
  'дебиолоид',
  'опан гангам стайл',
  'эйййй, секси бейби',
  'оп-оп-оп опан гангам стайл',
  'ала тоонун ар жагында балдар ойноп жатышат',
  'ала тоонун ар жагында кыздар ойноп жатышат',
  'еба, а ты реально красивая',
  'это ты, это я, между нами молния',
  'сулуусунго чырак😍',
  'вонючка',
  'бесстыжий пидор',
  'туппооооооой',
  'ты себя видел?',
  'да иди ты нахуй',
  'чмо',
  'э богумду же сен',
  'ай жетим десе',
  'ай жаныбар',
];

const specialResponses = [
  'Канааааат, да ты крууут!',
  'Канат, не зазнавайся!',
  'Слышь, даже если ты написал этого бота, это не отменяет тот факт, что ты гандон!',
  'Не ну ты издеваешься, Канат?',
  'Красавчиксин родной',
  'Канат пидорас',
  'Канат пидрила😍',
  'мамбет',
  'фуууу мамбетка',
  'Мразь ты, Канат',
];

const thanksResponses = ['Обращайся красавица 😘', 'всегда рад помочь 😊', 'ий жөжөм менин эчтеке эмес 😊'];

const triggerWords = ['токсик', '@kana_obsirator_bot', 'обсиратор'];
const specialUsers = ['sydykovkanat'];
const customResponses = {
  askrbkvvvv: ['Анаталия келди', 'Мощный Анаку'],
  elinwq: [
    'Элина лучшая бести бести любимка красотка😍😍😍',
    'Умница ты наша',
    'Молодец, жакшы кыз болуп чонойо бер',
    'Ий жаныбарым десе',
    'Элина сарт',
    'Элина курт',
    'Эй чалакыргызka',
    'эуууу',
    'элина сылаш',
    'эля, ты же моя курочка',
    'канат голубой',
    'Элина бокту же',
  ],
  rayanoou: ['Таластык эмессин', 'Раяна бок', 'Раянанын бети жок'],
  sss12mm1: ['Сезимка лучшая❤️❤️❤️', 'Сезима такая красивая утютютютют', 'Такая хорошенькая', 'Нюнюнюнюнюнюн милашка'],
  kall_333: ['Сайкал жинди', 'Сайкал, бокту же', 'Сайкал, адам болчу', 'Уят сага Сайкал'],
};

const obosratElya = ['Элина сарт', 'Элина курт', 'Элина чалакыргызka', 'элина сылаш', 'эля, ты же моя курочка'];
const obosratSaikal = [
  'Сайкал жаман',
  'Сайкал эшек',
  'Сайкал фуууу',
  'Сайкал бок',
  'Сайкал адам болчу',
  'Сайкал, сен качан адам болосун?',
];

const getRandomResponse = (responses) => {
  return responses[Math.floor(Math.random() * responses.length)];
};

const containsTriggerWord = (text) => {
  return triggerWords.some((word) => text.toLowerCase().includes(word));
};

const isMyFriends = ['xadelte', 'arkalox', 'hueuser', 'emnegedir'];

bot.on('text', async (ctx) => {
  try {
    const chatId = ctx.message.chat.id;
    const username = ctx.message.from.username || '';
    const messageText = ctx.message.text.toLowerCase() || '';
    const isReplyToBot = ctx.message.reply_to_message?.from?.username === bot.botInfo.username;

    if (excludedChatIds.includes(chatId)) return;

    if (
      (username === 'xadelte' || username === 'arkalox' || username === 'hueuser' || username === 'emnegedir') &&
      isReplyToBot
    ) {
      return ctx.reply('Жаным менин, сени эч качан жамандабаймго😘');
    }

    if ((username === 'sydykovkanat' || username === 'elinwq') && messageText === 'обосрать элю') {
      return ctx.reply(getRandomResponse(obosratElya), {
        reply_to_message_id: ctx.message.message_id,
      });
    } else if ((username !== 'sydykovkanat' || username !== 'elinwq') && messageText === 'обосрать элю') {
      return ctx.reply('Ты кто такой, чтобы обсирать Элю? Только Канат может обсирать эту милую курочку');
    }

    if (
      (username === 'sydykovkanat' || username === 'kall_333' || username === 'sss12mm1') &&
      messageText === 'обосрать сайкал'
    ) {
      return ctx.reply(getRandomResponse(obosratSaikal), {
        reply_to_message_id: ctx.message.message_id,
      });
    } else if (
      (username !== 'sydykovkanat' || username !== 'kall_333' || username !== 'sss12mm1') &&
      messageText === 'обосрать сайкал'
    ) {
      return ctx.reply('Э ты себя обосри да. Канат, Сезима и Сайкал могут обсирать эту милую телятину');
    }

    if (containsTriggerWord(messageText) && !isMyFriends.includes(username)) {
      return ctx.reply(getRandomResponse(generalResponses), { reply_to_message_id: ctx.message.message_id });
    }

    if (isReplyToBot) {
      if (username === 'l_ramilka_l') {
        return ctx.reply(getRandomResponse(['Рамиль гей', 'Молчать хреной гей🤬', 'Шучу сладенький мой😜']), {
          reply_to_message_id: ctx.message.message_id,
        });
      }

      if (messageText.toLowerCase().includes('спасибо')) {
        return ctx.reply(getRandomResponse(thanksResponses), { reply_to_message_id: ctx.message.message_id });
      }

      if (specialUsers.includes(username)) {
        return ctx.reply(getRandomResponse(specialResponses), { reply_to_message_id: ctx.message.message_id });
      }
      if (customResponses[username]) {
        if (Math.random() < 0.3) {
          return ctx.reply(getRandomResponse(customResponses[username]), {
            reply_to_message_id: ctx.message.message_id,
          });
        }
      }
      return ctx.reply(getRandomResponse(generalResponses), { reply_to_message_id: ctx.message.message_id });
    }

    if (Math.random() < 0.05) {
      if (isMyFriends.includes(username)) {
        return ctx.reply('Жаным менин, сени эч качан жамандабаймго😘');
      }
      if (specialUsers.includes(username)) {
        return ctx.reply(getRandomResponse(specialResponses), { reply_to_message_id: ctx.message.message_id });
      }
      if (customResponses[username]) {
        return ctx.reply(getRandomResponse(customResponses[username]), { reply_to_message_id: ctx.message.message_id });
      }
      return ctx.reply(getRandomResponse(generalResponses), { reply_to_message_id: ctx.message.message_id });
    }
  } catch (error) {
    console.error('Ошибка обработки сообщения:', error);
  }
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
