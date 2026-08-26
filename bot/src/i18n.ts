export type Lang = "en" | "uk" | "ru";

export const LANGUAGE_LABELS: Record<Lang, string> = {
  en: "🇬🇧 English",
  uk: "🇺🇦 Українська",
  ru: "🇷🇺 Русский",
};

const LOCALE_TAGS: Record<Lang, string> = {
  en: "en-US",
  uk: "uk-UA",
  ru: "ru-RU",
};

export const BRAND_PHOTO_URL =
  "https://images.unsplash.com/photo-1589244159943-460088ed5c92?auto=format&fit=crop&w=1200&q=80";

export const LANGUAGE_PROMPT =
  "🌸 <b>VelvetBloom</b>\n\nPlease choose your language / Оберіть мову / Выберите язык";

interface OrderLike {
  bouquetName: string;
  price: number;
  deliveryDate: string;
  note?: string;
}

interface Dictionary {
  welcome: string;
  about: string;
  contacts: string;
  invalidOrder: string;
  menu: {
    catalog: string;
    myOrders: string;
    activeOrders: string;
    about: string;
    contacts: string;
    changeLanguage: string;
    back: string;
  };
  ordersHistoryTitle: string;
  ordersHistoryEmpty: string;
  ordersActiveTitle: string;
  ordersActiveEmpty: string;
  statusActive: string;
  statusPast: string;
  orderAcceptedTitle: string;
  orderBouquetLabel: string;
  orderDeliveryLabel: string;
  orderPriceLabel: string;
  orderNoteLabel: string;
  orderFollowUp: string;
}

export const DICTIONARIES: Record<Lang, Dictionary> = {
  en: {
    welcome: `🌸 <b>VelvetBloom</b> - artisan floristry studio

We build bouquets like stories: with character, texture, and seasonal flowers. Every composition is a one-off piece, never a template.

Tap <b>"Catalog"</b> to open the mini app and pick a bouquet - with a live detail preview and delivery on the date you need.`,
    about: `<b>About VelvetBloom</b>

We're a small studio of artisan floristry. We work with local suppliers, hand-tie every bouquet on the day of delivery, and never use template compositions.

Focus: wedding floristry, gift bouquets, and interior compositions.

Made to order only - no ready-made shelf stock.`,
    contacts: `<b>VelvetBloom Contacts</b>

📍 Studio visits by appointment only
🕐 Orders accepted daily, 09:00–20:00
💬 Telegram: @velvetbloom_support
✉️ hello@velvetbloom.studio

This is a demo project for the NexuraDev portfolio - contacts are illustrative.`,
    invalidOrder: "Couldn't read that order. Please try again from the catalog.",
    menu: {
      catalog: "🌸 Catalog",
      myOrders: "🧾 My Orders",
      activeOrders: "🚚 Active Orders",
      about: "About",
      contacts: "Contacts",
      changeLanguage: "🌐 Change language",
      back: "← Menu",
    },
    ordersHistoryTitle: "🧾 <b>My Orders</b>",
    ordersHistoryEmpty: "You don't have any orders yet. Open the catalog and pick your first bouquet 🌸",
    ordersActiveTitle: "🚚 <b>Active Orders &amp; Delivery</b>",
    ordersActiveEmpty: "No active deliveries right now.",
    statusActive: "awaiting delivery",
    statusPast: "delivered",
    orderAcceptedTitle: "🌸 <b>Order received!</b>",
    orderBouquetLabel: "Bouquet",
    orderDeliveryLabel: "Delivery",
    orderPriceLabel: "Total",
    orderNoteLabel: "Note",
    orderFollowUp: "We'll reach out to confirm the details.",
  },
  uk: {
    welcome: `🌸 <b>VelvetBloom</b> - авторська флористична студія

Ми збираємо букети як історії: з характером, текстурою і сезонними квітами. Кожна композиція - окремий витвір, не шаблон.

Натисніть <b>«Каталог»</b>, щоб відкрити міні-застосунок і обрати букет - з живим переглядом деталей та доставкою на потрібну дату.`,
    about: `<b>Про VelvetBloom</b>

Ми - невелика студія авторської флористики. Працюємо з локальними постачальниками, збираємо букети вручну в день доставки і не використовуємо шаблонних композицій.

Спеціалізація: весільна флористика, подарункові букети та інтер'єрні композиції.

Формат - тільки на замовлення, без вітрини «про запас».`,
    contacts: `<b>Контакти VelvetBloom</b>

📍 Студія: лише за попереднім записом
🕐 Прийом замовлень: щодня, 09:00–20:00
💬 Telegram: @velvetbloom_support
✉️ hello@velvetbloom.studio

Це demo-проєкт для портфоліо NexuraDev - контакти умовні.`,
    invalidOrder: "Не вдалося прочитати замовлення. Спробуйте ще раз через каталог.",
    menu: {
      catalog: "🌸 Каталог",
      myOrders: "🧾 Мої замовлення",
      activeOrders: "🚚 Активні замовлення",
      about: "Про нас",
      contacts: "Контакти",
      changeLanguage: "🌐 Змінити мову",
      back: "← Меню",
    },
    ordersHistoryTitle: "🧾 <b>Мої замовлення</b>",
    ordersHistoryEmpty: "У вас ще немає замовлень. Відкрийте каталог і оберіть перший букет 🌸",
    ordersActiveTitle: "🚚 <b>Активні замовлення і доставка</b>",
    ordersActiveEmpty: "Наразі немає активних доставок.",
    statusActive: "очікує доставки",
    statusPast: "доставлено",
    orderAcceptedTitle: "🌸 <b>Замовлення прийнято!</b>",
    orderBouquetLabel: "Букет",
    orderDeliveryLabel: "Доставка",
    orderPriceLabel: "Вартість",
    orderNoteLabel: "Побажання",
    orderFollowUp: "Ми зв'яжемось із вами для підтвердження деталей.",
  },
  ru: {
    welcome: `🌸 <b>VelvetBloom</b> - студия авторской флористики

Мы собираем букеты как истории: с характером, текстурой и сезонными цветами. Каждая композиция - отдельное произведение, а не шаблон.

Нажмите <b>«Каталог»</b>, чтобы открыть мини-приложение и выбрать букет - с живым просмотром деталей и доставкой на нужную дату.`,
    about: `<b>О VelvetBloom</b>

Мы - небольшая студия авторской флористики. Работаем с локальными поставщиками, собираем букеты вручную в день доставки и не используем шаблонные композиции.

Специализация: свадебная флористика, подарочные букеты и интерьерные композиции.

Формат - только на заказ, без витрины «про запас».`,
    contacts: `<b>Контакты VelvetBloom</b>

📍 Студия: только по предварительной записи
🕐 Приём заказов: ежедневно, 09:00–20:00
💬 Telegram: @velvetbloom_support
✉️ hello@velvetbloom.studio

Это demo-проект для портфолио NexuraDev - контакты условные.`,
    invalidOrder: "Не удалось прочитать заказ. Попробуйте ещё раз через каталог.",
    menu: {
      catalog: "🌸 Каталог",
      myOrders: "🧾 Мои заказы",
      activeOrders: "🚚 Активные заказы",
      about: "О нас",
      contacts: "Контакты",
      changeLanguage: "🌐 Сменить язык",
      back: "← Меню",
    },
    ordersHistoryTitle: "🧾 <b>Мои заказы</b>",
    ordersHistoryEmpty: "У вас пока нет заказов. Откройте каталог и выберите первый букет 🌸",
    ordersActiveTitle: "🚚 <b>Активные заказы и доставка</b>",
    ordersActiveEmpty: "Сейчас нет активных доставок.",
    statusActive: "ожидает доставки",
    statusPast: "доставлено",
    orderAcceptedTitle: "🌸 <b>Заказ принят!</b>",
    orderBouquetLabel: "Букет",
    orderDeliveryLabel: "Доставка",
    orderPriceLabel: "Стоимость",
    orderNoteLabel: "Пожелание",
    orderFollowUp: "Мы свяжемся с вами для подтверждения деталей.",
  },
};

function formatDate(lang: Lang, iso: string): string {
  return new Intl.DateTimeFormat(LOCALE_TAGS[lang], { day: "numeric", month: "long" }).format(new Date(iso));
}

export function formatOrderLine(order: OrderLike, lang: Lang, isActive: boolean): string {
  const dict = DICTIONARIES[lang];
  const date = formatDate(lang, order.deliveryDate);
  const status = isActive ? dict.statusActive : dict.statusPast;
  const noteLine = order.note ? `\n💬 ${order.note}` : "";
  return `🌸 <b>${order.bouquetName}</b>\n${date} · ${order.price} ₴ · ${status}${noteLine}`;
}

export function formatOrderConfirmation(order: OrderLike, lang: Lang): string {
  const dict = DICTIONARIES[lang];
  const date = formatDate(lang, order.deliveryDate);
  const noteLine = order.note ? `\n${dict.orderNoteLabel}: ${order.note}` : "";
  return `${dict.orderAcceptedTitle}

${dict.orderBouquetLabel}: <b>${order.bouquetName}</b>
${dict.orderDeliveryLabel}: ${date}
${dict.orderPriceLabel}: ${order.price} ₴${noteLine}

${dict.orderFollowUp}`;
}
