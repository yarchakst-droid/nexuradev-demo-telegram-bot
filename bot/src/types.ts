import type { Lang } from "./i18n.js";

export interface OrderPayload {
  bouquetId: string;
  bouquetName: string;
  price: number;
  deliveryDate: string;
  note?: string;
}

export interface StoredOrder extends OrderPayload {
  id: string;
  createdAt: string;
}

export interface SessionData {
  lang: Lang | null;
  orders: StoredOrder[];
}
