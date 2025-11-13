import { AxiosFactory } from "@/lib/axios";

const lockerService = AxiosFactory("http://172.21.55.79:33480");

export const getAllLockers = (): Promise<any> => {
     return lockerService.get("/orders");
};
