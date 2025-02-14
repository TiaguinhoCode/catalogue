import { ItemsProducts } from "../products";

export type OrderItem = {
  id: string;
  product: ItemsProducts;
  quantity: number;
};

export type ItemsOrders = {
  id: string;
  client: string;
  status: { name: string };
  Items: OrderItem[]; 
  table: number;
  created_at: string;
  updated_at: string;
};
