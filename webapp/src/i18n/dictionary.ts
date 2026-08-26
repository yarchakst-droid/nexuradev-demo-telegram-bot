import type { Lang, Occasion } from "../types";

export const LOCALE_TAGS: Record<Lang, string> = {
  en: "en-US",
  uk: "uk-UA",
  ru: "ru-RU",
};

export interface UiDictionary {
  catalog: {
    title: string;
    subtitle: string;
    emptyFiltered: string;
    detailsCta: string;
  };
  filters: Record<Occasion | "all", string>;
  detail: {
    backLabel: string;
    flowersTitle: string;
    chooseButton: string;
    revealHint: string;
  };
  cart: {
    headerLabel: string;
    deliveryDateTitle: string;
    noteTitle: string;
    notePlaceholder: string;
    confirmButton: string;
    pickDateButton: string;
  };
  calendar: {
    weekdays: string[];
    months: string[];
    prevMonth: string;
    nextMonth: string;
  };
  confirmation: {
    title: string;
    body: (bouquetName: string, date: string) => string;
    doneButton: string;
    backToCatalogButton: string;
  };
}

export const DICTIONARIES: Record<Lang, UiDictionary> = {
  en: {
    catalog: {
      title: "Bouquet Catalog",
      subtitle: "Artisan floristry by VelvetBloom - for every occasion.",
      emptyFiltered: "No bouquets match this filter yet.",
      detailsCta: "Details",
    },
    filters: {
      all: "All",
      birthday: "Birthday",
      wedding: "Wedding",
      justBecause: "Just Because",
      romance: "Romance",
    },
    detail: {
      backLabel: "Catalog",
      flowersTitle: "What's inside",
      chooseButton: "Choose this bouquet",
      revealHint: "Hover or tap to see the composition details",
    },
    cart: {
      headerLabel: "Checkout",
      deliveryDateTitle: "Delivery date",
      noteTitle: "Note (optional)",
      notePlaceholder: "E.g. leave at the door, or a card message",
      confirmButton: "Confirm order",
      pickDateButton: "Pick a delivery date",
    },
    calendar: {
      weekdays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
      months: [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
      ],
      prevMonth: "Previous month",
      nextMonth: "Next month",
    },
    confirmation: {
      title: "Order received",
      body: (name, date) => `"${name}" will be delivered on ${date}. A confirmation was also sent to the bot chat.`,
      doneButton: "Done",
      backToCatalogButton: "Back to catalog",
    },
  },
  uk: {
    catalog: {
      title: "Каталог букетів",
      subtitle: "Авторська флористика VelvetBloom - під кожен привід.",
      emptyFiltered: "Букетів за цим фільтром поки немає.",
      detailsCta: "Детальніше",
    },
    filters: {
      all: "Усі",
      birthday: "День народження",
      wedding: "Весілля",
      justBecause: "Просто так",
      romance: "Романтика",
    },
    detail: {
      backLabel: "Каталог",
      flowersTitle: "До складу входять",
      chooseButton: "Обрати цей букет",
      revealHint: "Наведіть або торкніться, щоб побачити деталі композиції",
    },
    cart: {
      headerLabel: "Оформлення замовлення",
      deliveryDateTitle: "Дата доставки",
      noteTitle: "Побажання (необов'язково)",
      notePlaceholder: "Наприклад: залишити на порозі, або підпис до листівки",
      confirmButton: "Підтвердити замовлення",
      pickDateButton: "Оберіть дату доставки",
    },
    calendar: {
      weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
      months: [
        "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
        "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень",
      ],
      prevMonth: "Попередній місяць",
      nextMonth: "Наступний місяць",
    },
    confirmation: {
      title: "Замовлення прийнято",
      body: (name, date) => `«${name}» доставимо ${date}. Підтвердження також надіслано у чат бота.`,
      doneButton: "Готово",
      backToCatalogButton: "До каталогу",
    },
  },
  ru: {
    catalog: {
      title: "Каталог букетов",
      subtitle: "Авторская флористика VelvetBloom - под любой повод.",
      emptyFiltered: "Букетов по этому фильтру пока нет.",
      detailsCta: "Подробнее",
    },
    filters: {
      all: "Все",
      birthday: "День рождения",
      wedding: "Свадьба",
      justBecause: "Просто так",
      romance: "Романтика",
    },
    detail: {
      backLabel: "Каталог",
      flowersTitle: "В составе",
      chooseButton: "Выбрать этот букет",
      revealHint: "Наведите или коснитесь, чтобы увидеть детали композиции",
    },
    cart: {
      headerLabel: "Оформление заказа",
      deliveryDateTitle: "Дата доставки",
      noteTitle: "Пожелание (необязательно)",
      notePlaceholder: "Например: оставить у двери, или подпись к открытке",
      confirmButton: "Подтвердить заказ",
      pickDateButton: "Выберите дату доставки",
    },
    calendar: {
      weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      months: [
        "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
        "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
      ],
      prevMonth: "Предыдущий месяц",
      nextMonth: "Следующий месяц",
    },
    confirmation: {
      title: "Заказ принят",
      body: (name, date) => `«${name}» доставим ${date}. Подтверждение также отправлено в чат бота.`,
      doneButton: "Готово",
      backToCatalogButton: "К каталогу",
    },
  },
};
