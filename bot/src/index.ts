import "dotenv/config";
import { randomUUID } from "node:crypto";
import { Bot, session, type Context, type SessionFlavor } from "grammy";
import { BRAND_PHOTO_URL, DICTIONARIES, LANGUAGE_PROMPT, formatOrderConfirmation, formatOrderLine, type Lang } from "./i18n.js";
import { backToMenuKeyboard, languagePickerKeyboard, mainMenuKeyboard } from "./keyboards.js";
import type { OrderPayload, SessionData, StoredOrder } from "./types.js";

type MyContext = Context & SessionFlavor<SessionData>;

const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error("BOT_TOKEN is not set. Copy .env.example to .env and fill it in.");
}

const bot = new Bot<MyContext>(token);

bot.use(
  session({
    initial: (): SessionData => ({ lang: null, orders: [] }),
  })
);

function isActiveOrder(order: StoredOrder): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(order.deliveryDate) >= today;
}

function currentLang(ctx: MyContext): Lang {
  return ctx.session.lang ?? "en";
}

async function sendWelcome(ctx: MyContext, lang: Lang) {
  await ctx.replyWithPhoto(BRAND_PHOTO_URL, {
    caption: DICTIONARIES[lang].welcome,
    parse_mode: "HTML",
    reply_markup: mainMenuKeyboard(lang),
  });
}

async function sendLanguagePrompt(ctx: MyContext) {
  await ctx.reply(LANGUAGE_PROMPT, { parse_mode: "HTML", reply_markup: languagePickerKeyboard() });
}

bot.command("start", async (ctx) => {
  if (ctx.session.lang) {
    await sendWelcome(ctx, ctx.session.lang);
    return;
  }
  await sendLanguagePrompt(ctx);
});

bot.callbackQuery(/^lang:(en|uk|ru)$/, async (ctx) => {
  const lang = ctx.match[1] as Lang;
  ctx.session.lang = lang;
  await ctx.answerCallbackQuery();
  await sendWelcome(ctx, lang);
});

bot.callbackQuery("lang:change", async (ctx) => {
  await ctx.answerCallbackQuery();
  await sendLanguagePrompt(ctx);
});

bot.callbackQuery("about", async (ctx) => {
  const lang = currentLang(ctx);
  await ctx.answerCallbackQuery();
  await ctx.reply(DICTIONARIES[lang].about, { parse_mode: "HTML", reply_markup: backToMenuKeyboard(lang) });
});

bot.callbackQuery("contacts", async (ctx) => {
  const lang = currentLang(ctx);
  await ctx.answerCallbackQuery();
  await ctx.reply(DICTIONARIES[lang].contacts, { parse_mode: "HTML", reply_markup: backToMenuKeyboard(lang) });
});

bot.callbackQuery("menu", async (ctx) => {
  const lang = currentLang(ctx);
  await ctx.answerCallbackQuery();
  await sendWelcome(ctx, lang);
});

bot.callbackQuery("orders:history", async (ctx) => {
  const lang = currentLang(ctx);
  const dict = DICTIONARIES[lang];
  await ctx.answerCallbackQuery();
  const orders = ctx.session.orders;
  if (orders.length === 0) {
    await ctx.reply(`${dict.ordersHistoryTitle}\n\n${dict.ordersHistoryEmpty}`, {
      parse_mode: "HTML",
      reply_markup: backToMenuKeyboard(lang),
    });
    return;
  }
  const sorted = [...orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const lines = sorted.map((o) => formatOrderLine(o, lang, isActiveOrder(o)));
  await ctx.reply(`${dict.ordersHistoryTitle}\n\n${lines.join("\n\n")}`, {
    parse_mode: "HTML",
    reply_markup: backToMenuKeyboard(lang),
  });
});

bot.callbackQuery("orders:active", async (ctx) => {
  const lang = currentLang(ctx);
  const dict = DICTIONARIES[lang];
  await ctx.answerCallbackQuery();
  const active = ctx.session.orders
    .filter(isActiveOrder)
    .sort((a, b) => a.deliveryDate.localeCompare(b.deliveryDate));
  if (active.length === 0) {
    await ctx.reply(`${dict.ordersActiveTitle}\n\n${dict.ordersActiveEmpty}`, {
      parse_mode: "HTML",
      reply_markup: backToMenuKeyboard(lang),
    });
    return;
  }
  const lines = active.map((o) => formatOrderLine(o, lang, true));
  await ctx.reply(`${dict.ordersActiveTitle}\n\n${lines.join("\n\n")}`, {
    parse_mode: "HTML",
    reply_markup: backToMenuKeyboard(lang),
  });
});

bot.on("message:web_app_data", async (ctx) => {
  const lang = currentLang(ctx);
  const raw = ctx.message.web_app_data.data;
  try {
    const payload = JSON.parse(raw) as OrderPayload;
    const stored: StoredOrder = {
      ...payload,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
    };
    ctx.session.orders.push(stored);
    await ctx.reply(formatOrderConfirmation(stored, lang), {
      parse_mode: "HTML",
      reply_markup: backToMenuKeyboard(lang),
    });
  } catch {
    await ctx.reply(DICTIONARIES[lang].invalidOrder);
  }
});

bot.catch((err) => {
  console.error("Bot error:", err.message);
});

bot.start();
console.log("VelvetBloom bot is running...");
