import classNames from "classnames";
import { ReactNode } from "react";

import { FieldSet } from "../FieldSet";

export interface SearchAreaProps {
     title: string;
     className?: string;
     children: ReactNode;
}

export const SearchArea = ({ title, className, children }: SearchAreaProps) => {
     return (
          <FieldSet legend={title} className={classNames("SearchArea", className)}>
               {children}
          </FieldSet>
     );
};
