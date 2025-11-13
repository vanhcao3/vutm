import { SECURITY_URL } from "@/config";
import { AxiosFactory } from "@/lib/axios";
import { Privilege } from "../type";

const apiPrivileges = AxiosFactory(SECURITY_URL);

export const getPrivileges = (): Promise<Privilege[]> => {
     return apiPrivileges.get("/privileges");
};

export const postPrivileges = (data: Privilege): Promise<Privilege> => {
     return apiPrivileges.post("/privileges", data);
};

export const putPrivileges = (id: string, data: Privilege): Promise<Privilege> => {
     return apiPrivileges.put(`/privileges/${id}`, data);
};

export const getPrivilegesById = (id: string): Promise<Privilege> => {
     return apiPrivileges.get(`/privileges/${id}`);
};

export const deletePrivileges = (id: string): Promise<Privilege> => {
     return apiPrivileges.delete(`/privileges/${id}`);
};
