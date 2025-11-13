import { AxiosFactory } from "@/lib/axios";
import { Order } from "../types";

const orderService = AxiosFactory("https://airtransys.site:9443/at-order");

export const getAllOrders = (): Promise<Order[]> => {
     return orderService.get("/orders");
};

export const createOrder = (order: Partial<Order>) => {
     return orderService.post("/orders", order);
};

export const getOrderById = (orderId: string) => {
     return orderService.get(`/orders/${orderId}`);
};
