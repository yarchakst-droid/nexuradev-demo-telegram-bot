export type Lang = "en" | "uk" | "ru";

export type Occasion = "birthday" | "wedding" | "justBecause" | "romance";

export interface Bouquet {
  id: string;
  name: Record<Lang, string>;
  occasion: Occasion[];
  price: number;
  image: string;
  detailImage: string;
  flowers: Record<Lang, string[]>;
  description: Record<Lang, string>;
}

export interface OrderPayload {
  bouquetId: string;
  bouquetName: string;
  price: number;
  deliveryDate: string;
  note?: string;
}
