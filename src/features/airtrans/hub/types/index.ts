export interface Hub {
     id: string;
     name: string;
     description: string;
     position: Array<number>;
     created_by: string;
     users: Array<string>;
     lockers: Array<Hub>;
}
