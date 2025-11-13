/* eslint-disable no-restricted-imports */
import * as React from "react";
import { useAuth } from "./auth";

export enum ROLES {
     ADMIN = "ADMIN",
     USER = "USER",
}

type RoleTypes = keyof typeof ROLES;

export const POLICIES = {
     // "comment:delete": (user: User, comment: Comment) => {
     //      if (user.role === "ADMIN") {
     //           return true;
     //      }
     //      if (user.role === "USER" && comment.authorId === user.id) {
     //           return true;
     //      }
     //      return false;
     // },
};

export const useAuthorization = () => {
     const { user } = useAuth();
     if (!user) {
          throw Error("User does not exist!");
     }

     const checkAccess = React.useCallback(
          ({ allowedRoles }: { allowedRoles: RoleTypes[] }) => {
               if (allowedRoles && allowedRoles.length > 0) {
                    // user.roles is now an array of strings
                    return user.roles.some((role: string) =>
                         allowedRoles.includes(role as RoleTypes)
                    );
               }
               return true;
          },
          [user.roles]
     );

     return { checkAccess, roles: user.roles };
};

type AuthorizationProps = {
     forbiddenFallback?: React.ReactNode;
     children: React.ReactNode;
} & (
     | {
            allowedRoles: RoleTypes[];
            policyCheck?: never;
       }
     | {
            allowedRoles?: never;
            policyCheck: boolean;
       }
);

export const Authorization = ({
     policyCheck,
     allowedRoles,
     forbiddenFallback = null,
     children,
}: AuthorizationProps) => {
     const { checkAccess } = useAuthorization();

     let canAccess = false;

     if (allowedRoles) {
          canAccess = checkAccess({ allowedRoles });
     }

     if (typeof policyCheck !== "undefined") {
          canAccess = policyCheck;
     }

     return <>{canAccess ? children : forbiddenFallback}</>;
};
