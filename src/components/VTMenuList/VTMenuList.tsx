import { Menu } from "@mui/material";
import RenderNestedMenu from "./components";

export interface dataMenuType {
     label?: string;
     metaData: {
          id: string | number;
          rightIcon?: React.ReactNode;
          leftIcon?: React.ReactNode;
          element?: React.ReactNode;
     };
     children?: dataMenuType[];
}

interface VTMenuListProps {
     open: boolean;
     anchorEl?: null | Element | ((element: Element) => Element);
     onClose: () => void;
     onClickMenuItem: (id: any) => void;
     dataMenu: dataMenuType[];
     top?: number;
     left?: number;
}

export const VTMenuList = (props: VTMenuListProps) => {
     const { top, left, dataMenu, open, anchorEl, onClose, onClickMenuItem } = props;

     return (
          <Menu
               open={open}
               //    anchorEl={anchorEl}
               onClose={onClose}
               anchorReference="anchorPosition"
               anchorPosition={{ top: top, left: left }}
          >
               <RenderNestedMenu
                    data={dataMenu}
                    parentMenuOpen={open}
                    onClose={onClose}
                    onClickMenuItem={onClickMenuItem}
               />
          </Menu>
     );
};
