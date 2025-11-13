import { AxiosFactory } from "@/lib/axios";

export const commandService = AxiosFactory("https://airtransys.site:9443/at-command");

export const createCommand = (command: any) => {
     return commandService.post("/commands", command);
};

export const editCommand = (command: any) => {
     return commandService.put(`/commands/${command.id}`, command);
};
