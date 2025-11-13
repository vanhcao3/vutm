import { convertArrayToObject } from "@/utils/convert";
import { Hub } from "../types";

export const convertHubListToRecords = (hubList: Array<Hub>) => {
     const allHubAndLockers: Hub[] = [];
     hubList.forEach((hub) => {
          allHubAndLockers.push(hub);
          if (hub.lockers && hub.lockers.length) {
               hub.lockers.forEach((locker) => {
                    allHubAndLockers.push(locker);
               });
          }
     });

     return convertArrayToObject(allHubAndLockers);
};
