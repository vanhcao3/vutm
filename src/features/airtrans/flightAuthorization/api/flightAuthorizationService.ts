import { AxiosFactory } from "@/lib/axios";

const flightAuthorizationService = AxiosFactory(
     "https://airtransys.site:9443/flight-authorization"
);

export const getAllFlightApprovals = () => {
     return flightAuthorizationService.get("/flight-authorization-approvals");
};

export const getFlightApprovalById = (id: string) => {
     return flightAuthorizationService.get(`/flight-authorization-approvals/${id}`);
};
