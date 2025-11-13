import { IconMenuItem, NestedMenuItem } from "mui-nested-menu";
import { dataMenuType } from "../VTMenuList";
import React from "react";

interface RenderNestedMenuProps {
     parentMenuOpen: boolean;
     onClose: () => void;
     data: dataMenuType[];
     onClickMenuItem: (id: any) => void;
}

export const RenderNestedMenu = (props: RenderNestedMenuProps) => {
     const { data, parentMenuOpen, onClose, onClickMenuItem } = props;

     const handleClickMenuItem = (id_menu) => {
          onClickMenuItem(id_menu);
          onClose();
     };

     return (
          <>
               {data.map((item, idx) => {
                    if (item.children)
                         return (
                              <NestedMenuItem
                                   key={item.metaData.id}
                                   label={item.label}
                                   parentMenuOpen={parentMenuOpen}
                                   leftIcon={item.metaData.leftIcon}
                                   rightIcon={item.metaData.rightIcon}
                              >
                                   {item.metaData.element}
                                   <RenderNestedMenu
                                        data={item.children}
                                        parentMenuOpen={parentMenuOpen}
                                        onClose={onClose}
                                        onClickMenuItem={onClickMenuItem}
                                   />
                              </NestedMenuItem>
                         );
                    return (
                         <div key={item.metaData.id}>
                              {item.metaData.element}
                              <IconMenuItem
                                   key={item.metaData.id}
                                   label={item.label}
                                   onClick={() => handleClickMenuItem(item.metaData.id)}
                                   leftIcon={item.metaData.leftIcon}
                                   rightIcon={item.metaData.rightIcon}
                              />
                         </div>
                    );
               })}
          </>
     );
};
