export type BaseEntity = {
     id?: string;
     createdAt: number;
};

export interface Privilege {
     id: string;
     code: string;
     alias: string;
     name: string;
     path: string;
     icon: string;
     sort: number;
     parent_id: null | string;
}

export interface DrawerItem {
     label: string;
     icon_name: string;
     route?: string;
     id?: string;
     parentId?: string;
}

export interface UserInfo {
     email: string;
     family_name: string;
     given_name: string;
     name: string;
     roles: Array<string>;
     site: string;
     unit: string;
     user_id: string;
     username: string;
}
