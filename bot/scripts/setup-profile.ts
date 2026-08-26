import "dotenv/config";
import { Bot } from "grammy";
import type { Lang } from "../src/i18n";

const token = process.env.BOT_TOKEN;
if (!token) {
  throw new Error("BOT_TOKEN is not set. Copy .env.example to .env and fill it in.");
}

const bot = new Bot(token);

const NAME = "VelvetBloom";

const SHORT_DESCRIPTIONS: Record<Lang, string> = {
  en: "Artisan floristry studio - browse bouquets and order delivery right in Telegram.",
  uk: "Студія авторської флористики - обирайте букети та замовляйте доставку прямо в Telegram.",
  ru: "Студия авторской флористики - выбирайте букеты и заказывайте доставку прямо в Telegram.",
};

const DESCRIPTIONS: Record<Lang, string> = {
  en: "VelvetBloom is an artisan floristry studio. Open the catalog to browse hand-tied bouquets, pick a delivery date, and track your orders - all inside this chat.",
  uk: "VelvetBloom - студія авторської флористики. Відкрийте каталог, щоб обрати букет ручної роботи, вкажіть дату доставки та відстежуйте замовлення - все в цьому чаті.",
  ru: "VelvetBloom - студия авторской флористики. Откройте каталог, чтобы выбрать букет ручной работы, укажите дату доставки и отслеживайте заказы - всё в этом чате.",
};

async function main() {
  await bot.api.setMyName(NAME);
  console.log(`Name set: ${NAME}`);

  for (const lang of Object.keys(SHORT_DESCRIPTIONS) as Lang[]) {
    await bot.api.setMyShortDescription(SHORT_DESCRIPTIONS[lang], { language_code: lang });
    console.log(`Short description [${lang}] set.`);
  }

  for (const lang of Object.keys(DESCRIPTIONS) as Lang[]) {
    await bot.api.setMyDescription(DESCRIPTIONS[lang], { language_code: lang });
    console.log(`Description [${lang}] set.`);
  }

  await bot.api.setMyCommands([{ command: "start", description: "Open VelvetBloom / Відкрити VelvetBloom" }]);
  console.log("Commands set.");

  console.log("\nDone. Bot name, description and commands are updated.");
  console.log(
    "Note: Telegram's Bot API has no endpoint for a bot's own profile photo - " +
      "send a square image to @BotFather using /setuserpic to set the avatar."
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
