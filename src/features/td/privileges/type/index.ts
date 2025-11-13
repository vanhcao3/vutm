export interface Privilege {
     id?: string;
     code: string;
     name: string;
     parent_id?: string;
}

export const initPrivilege: Privilege = {
     code: "",
     name: "",
};
