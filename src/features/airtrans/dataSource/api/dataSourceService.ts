import { AxiosFactory } from "@/lib/axios";
import { DataSource } from "../types";

const dataSourceService = AxiosFactory("https://airtransys.site:9443/at-datasource");

export const getAllDataSource = (): Promise<Array<DataSource>> => {
     return dataSourceService.get("/datasources");
};
