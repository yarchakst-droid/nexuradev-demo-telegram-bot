import { InlineKeyboard } from "grammy";
import { DICTIONARIES, LANGUAGE_LABELS, type Lang } from "./i18n";

const WEBAPP_URL = process.env.WEBAPP_URL ?? "https://example.com";

export function languagePickerKeyboard(): InlineKeyboard {
  return new InlineKeyboard()
    .text(LANGUAGE_LABELS.en, "lang:en")
    .row()
    .text(LANGUAGE_LABELS.uk, "lang:uk")
    .row()
    .text(LANGUAGE_LABELS.ru, "lang:ru");
}

export function mainMenuKeyboard(lang: Lang): InlineKeyboard {
  const dict = DICTIONARIES[lang];
  const webAppUrl = `${WEBAPP_URL}?lang=${lang}`;
  return new InlineKeyboard()
    .webApp(dict.menu.catalog, webAppUrl)
    .row()
    .text(dict.menu.myOrders, "orders:history")
    .text(dict.menu.activeOrders, "orders:active")
    .row()
    .text(dict.menu.about, "about")
    .text(dict.menu.contacts, "contacts")
    .row()
    .text(dict.menu.changeLanguage, "lang:change");
}

export function backToMenuKeyboard(lang: Lang): InlineKeyboard {
  return new InlineKeyboard().text(DICTIONARIES[lang].menu.back, "menu");
}
