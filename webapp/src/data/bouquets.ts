import type { Bouquet } from "../types";

function img(id: string, w: number): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
}

export const bouquets: Bouquet[] = [
  {
    id: "whispering-peony",
    occasion: ["romance", "justBecause"],
    price: 1650,
    image: img("photo-1511201173873-c327e63eb6c4", 800),
    detailImage: img("photo-1575178094668-132dc931ad35", 1200),
    name: { en: "Whispering Peony", uk: "Шепіт півонії", ru: "Шёпот пиона" },
    description: {
      en: "A soft, voluminous bouquet of milky and blush peonies - for moments you want to hold onto.",
      uk: "Ніжний об'ємний букет з молочних та рожевих півоній - для моментів, які хочеться продовжити.",
      ru: "Нежный объёмный букет из молочных и розовых пионов - для моментов, которые хочется продлить.",
    },
    flowers: {
      en: ["Sarah Bernhardt peony", "Kahala rose", "Eucalyptus", "Stock flower"],
      uk: ["Півонія Сара Бернар", "Троянда Кахала", "Евкаліпт", "Матіола"],
      ru: ["Пион Сара Бернар", "Роза Кахала", "Эвкалипт", "Маттиола"],
    },
  },
  {
    id: "ivory-vow",
    occasion: ["wedding"],
    price: 3200,
    image: img("photo-1487530811176-3780de880c2d", 800),
    detailImage: img("photo-1521543832500-49e69fb2bea2", 1200),
    name: { en: "Ivory Vow", uk: "Клятва Айворі", ru: "Клятва Айвори" },
    description: {
      en: "A bridal bouquet in clean ivory tones with textured greenery.",
      uk: "Весільний букет нареченої у чистих кремових тонах з фактурною зеленню.",
      ru: "Свадебный букет невесты в чистых кремовых тонах с фактурной зеленью.",
    },
    flowers: {
      en: ["Vendela rose", "Snow-white peony", "Ranunculus", "Olive branches"],
      uk: ["Троянда Vendela", "Півонія білосніжна", "Ранункулюс", "Гілки оливи"],
      ru: ["Роза Vendela", "Белоснежный пион", "Ранункулюс", "Оливковые ветви"],
    },
  },
  {
    id: "crimson-muse",
    occasion: ["romance"],
    price: 1980,
    image: img("photo-1582794543139-8ac9cb0f7b11", 800),
    detailImage: img("photo-1523693916903-027d144a2b7d", 1200),
    name: { en: "Crimson Muse", uk: "Багряна Муза", ru: "Багряная Муза" },
    description: {
      en: "A bold, minimalist bouquet of deep-red roses for a statement gesture.",
      uk: "Насичений мінімалістичний букет із бордових троянд для сильного жесту.",
      ru: "Насыщенный минималистичный букет из бордовых роз для сильного жеста.",
    },
    flowers: {
      en: ["Red Naomi rose", "Hypericum berries", "Burgundy scabiosa"],
      uk: ["Троянда Ред Наомі", "Гіперикум", "Скабіоза бордо"],
      ru: ["Роза Ред Наоми", "Гиперикум", "Скабиоза бордо"],
    },
  },
  {
    id: "sunlit-meadow",
    occasion: ["birthday", "justBecause"],
    price: 1280,
    image: img("photo-1508808703020-ef18109db02f", 800),
    detailImage: img("photo-1561848355-890d054dc55a", 1200),
    name: { en: "Sunlit Meadow", uk: "Сонячна Галявина", ru: "Солнечная Поляна" },
    description: {
      en: "A light, pastel mood bouquet that smells like summer even in winter.",
      uk: "Легкий пастельний букет-настрій, що пахне літом навіть узимку.",
      ru: "Лёгкий пастельный букет-настроение, который пахнет летом даже зимой.",
    },
    flowers: {
      en: ["Ranunculus", "Cream chrysanthemum", "Baby's breath", "Wild greenery"],
      uk: ["Ранункулюс", "Хризантема кремова", "Гіпсофіла", "Польова зелень"],
      ru: ["Ранункулюс", "Кремовая хризантема", "Гипсофила", "Полевая зелень"],
    },
  },
  {
    id: "blush-serenade",
    occasion: ["justBecause", "romance"],
    price: 1420,
    image: img("photo-1539622230226-3d4eb483b3f2", 800),
    detailImage: img("photo-1626976109816-08cef8600d7d", 1200),
    name: { en: "Blush Serenade", uk: "Рожева Серенада", ru: "Розовая Серенада" },
    description: {
      en: "A serenade in muted pink tones - no occasion needed, just because.",
      uk: "Букет-серенада у приглушено-рожевій гамі - без приводу, просто тому що.",
      ru: "Букет-серенада в приглушённо-розовой гамме - без повода, просто так.",
    },
    flowers: {
      en: ["Lilac peony", "Powder rose", "Lisianthus"],
      uk: ["Півонія бузкова", "Троянда пудрова", "Лізіантус"],
      ru: ["Сиреневый пион", "Пудровая роза", "Лизиантус"],
    },
  },
  {
    id: "garden-vow",
    occasion: ["wedding"],
    price: 2950,
    image: img("photo-1525258946800-98cfd641d0de", 800),
    detailImage: img("photo-1550005809-91ad75fb315f", 1200),
    name: { en: "Garden Vow", uk: "Садова Клятва", ru: "Садовая Клятва" },
    description: {
      en: "A \"fresh-from-the-garden\" bouquet - loose shape, layered texture.",
      uk: "Букет у стилі «щойно з саду» - вільна форма, багатошарова текстура.",
      ru: "Букет в стиле «прямо из сада» - свободная форма, многослойная текстура.",
    },
    flowers: {
      en: ["David Austin rose", "Delphinium", "Hydrangea", "Olive branch"],
      uk: ["Троянда David Austin", "Дельфініум", "Гортензія", "Оливкова гілка"],
      ru: ["Роза David Austin", "Дельфиниум", "Гортензия", "Оливковая ветвь"],
    },
  },
  {
    id: "velvet-rose",
    occasion: ["romance"],
    price: 1750,
    image: img("photo-1559779080-6970e0186790", 800),
    detailImage: img("photo-1572454591674-2739f30d8c40", 1200),
    name: { en: "Velvet Rose", uk: "Оксамитова Троянда", ru: "Бархатная Роза" },
    description: {
      en: "A classic mono-bouquet of deep-red roses wrapped in craft paper.",
      uk: "Класичний монобукет із бордових троянд у крафтовій обгортці.",
      ru: "Классический монобукет из бордовых роз в крафтовой обёртке.",
    },
    flowers: {
      en: ["Espérance rose", "Silver eucalyptus", "Brunia"],
      uk: ["Троянда Espérance", "Евкаліпт срібний", "Бруния"],
      ru: ["Роза Espérance", "Серебристый эвкалипт", "Бруния"],
    },
  },
  {
    id: "golden-hour",
    occasion: ["birthday"],
    price: 1550,
    image: img("photo-1601979689063-cb474664e70b", 800),
    detailImage: img("photo-1530903677198-7c9f3577a63e", 1200),
    name: { en: "Golden Hour", uk: "Золота Година", ru: "Золотой Час" },
    description: {
      en: "A warm bouquet in evening-sun colors - for a day worth celebrating loudly.",
      uk: "Теплий букет кольору вечірнього сонця - для дня, який хочеться відсвяткувати гучно.",
      ru: "Тёплый букет цвета вечернего солнца - для дня, который хочется отпраздновать громко.",
    },
    flowers: {
      en: ["Peach ranunculus", "Tulip", "Cream rose"],
      uk: ["Ранункулюс персиковий", "Тюльпан", "Кремова троянда"],
      ru: ["Персиковый ранункулюс", "Тюльпан", "Кремовая роза"],
    },
  },
  {
    id: "just-because",
    occasion: ["justBecause"],
    price: 990,
    image: img("photo-1560583035-6d14e41fac5f", 800),
    detailImage: img("photo-1579664872746-55e2a805d705", 1200),
    name: { en: "Just Because", uk: "Просто Так", ru: "Просто Так" },
    description: {
      en: "A compact no-occasion bouquet - to make someone's Tuesday better.",
      uk: "Компактний букет без приводу - щоб зробити чийсь вівторок кращим.",
      ru: "Компактный букет без повода - чтобы сделать чей-то вторник лучше.",
    },
    flowers: {
      en: ["Chrysanthemum", "Spray rose", "Assorted greenery"],
      uk: ["Хризантема", "Троянда кущова", "Зелень асорті"],
      ru: ["Хризантема", "Кустовая роза", "Ассорти зелени"],
    },
  },
  {
    id: "wildflower-wish",
    occasion: ["justBecause", "birthday"],
    price: 1180,
    image: img("photo-1495987976467-244d20b4b39a", 800),
    detailImage: img("photo-1689946242927-0537a5aa6d19", 1200),
    name: { en: "Wildflower Wish", uk: "Польове Бажання", ru: "Полевое Желание" },
    description: {
      en: "A loose, wild bouquet - a little undone, very alive.",
      uk: "Вільний польовий букет - трохи розхристаний, дуже живий.",
      ru: "Свободный полевой букет - немного растрёпанный, очень живой.",
    },
    flowers: {
      en: ["Field poppies", "Daisy", "Fescue grass", "Cornflowers"],
      uk: ["Польові маки", "Ромашка", "Вівсяниця", "Волошки"],
      ru: ["Полевые маки", "Ромашка", "Овсяница", "Васильки"],
    },
  },
];
