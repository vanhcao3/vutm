export interface FlightAuthorizationInfo {
     id: string;
}

export interface FlightApproval {
     id: string;
     name: string;
     operator: {
          id: string;
          business_name: string;
     };
}
