// Order Service
import { storageService } from "./storageService";
import { CartItem } from "./cartService";

const ORDERS_KEY = "rasokart_orders";

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "delivered" | "cancelled";
  createdAt: string;
  address: string;
}

export const orderService = {
  getOrders(): Order[] {
    return storageService.get<Order[]>(ORDERS_KEY) ?? [];
  },

  placeOrder(items: CartItem[], total: number, address: string): Order {
    const orders = this.getOrders();
    const newOrder: Order = {
      id: Date.now().toString(),
      items,
      total,
      status: "pending",
      createdAt: new Date().toISOString(),
      address,
    };
    orders.push(newOrder);
    storageService.set(ORDERS_KEY, orders);
    return newOrder;
  },

  getOrderById(id: string): Order | undefined {
    return this.getOrders().find((o) => o.id === id);
  },
};
