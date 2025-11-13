import clsx from "clsx";
import { useEffect, useMemo, useState } from "react";
import { saveDataToLocalStorage } from "../../../service";
import VTMenuList from "@/components/VTMenuList";
import { TextField } from "@mui/material";
import VTColorPicker from "@/components/VTColorPicker";

interface ContextMenuProps {
     getListText: any;
     id?: string;
     handleDisplay?: () => void;
     handleFontSize?: (value) => void;
     handleColor?: (value) => void;
     elementInput?: any;
     anchorContexMenu: any;
     top: number;
     left: number;
     handleClickMenuItem: any;
     handleClose: any;
}

export function ContextMenu(props: ContextMenuProps) {
     const {
          getListText,

          id,
          anchorContexMenu,
          top,
          left,
          handleDisplay,
          handleFontSize,
          handleColor,
          elementInput,
          handleClose,
          handleClickMenuItem,
     } = props;

     const handleDeleteText = () => {
          let a = [];
          a = JSON.parse(window.localStorage.getItem("listText")) || [];
          a = a.filter((item) => item.id !== id);
          window.localStorage.setItem("listText", JSON.stringify(a));
          handleDisplay();
     };

     const handleFocusText = () => {
          elementInput && elementInput?.focus();
          console.log("elementInput", elementInput);
          handleDisplay();
     };

     const handleColorText = (value) => {
          saveDataToLocalStorage({
               name: "listText",
               id: id,
               modify: [
                    {
                         value: value,
                         name: "color",
                    },
               ],
          });
     };

     const handleFontSizeText = (value) => {
          saveDataToLocalStorage({
               name: "listText",
               id: id,
               modify: [
                    {
                         value: value,
                         name: "fontSize",
                    },
               ],
          });
     };

     const getColorText = useMemo(() => {
          let value = "";

          getListText.find((item) => {
               if (item.id === id) {
                    return (value = item.color);
               }
          });
          if (value) {
               return value;
          }
          return "#ffffff";
     }, [getListText, id, anchorContexMenu]);

     const getFontSizeText = useMemo(() => {
          let value = null;

          getListText.find((item) => {
               if (item.id === id) {
                    return (value = item.fontSize);
               }
          });
          if (value) {
               return value;
          }
          return 16;
     }, [getListText, id]);

     useEffect(() => {
          getColorText;
          getFontSizeText;
     }, [getColorText, getFontSizeText]);

     const dataContextMenu = [
          {
               label: "Sửa text",
               metaData: {
                    id: 1,
               },
          },
          {
               label: "Cỡ chữ",
               metaData: {
                    id: 2,
               },
               children: [
                    {
                         metaData: {
                              id: 9,
                              element: (
                                   <TextField
                                        size="small"
                                        type="number"
                                        value={getFontSizeText}
                                        onChange={(e) => {
                                             handleFontSize(e.target.value as unknown as number);
                                             handleFontSizeText(e.target.value);
                                        }}
                                   ></TextField>
                              ),
                         },
                    },
               ],
          },
          {
               label: "Màu sắc",
               metaData: {
                    id: 3,
               },
               children: [
                    {
                         metaData: {
                              id: 10,
                              element: (
                                   <VTColorPicker
                                        onColorEmit={(color) => {
                                             handleColor(color);
                                             handleColorText(color);
                                        }}
                                        value={getColorText}
                                   />
                              ),
                         },
                    },
               ],
          },
          {
               label: " Xóa",
               metaData: {
                    id: 4,
               },
          },
     ];
     const clickMenuItem = (id) => {
          switch (id) {
               case 1: // sua text
                    {
                         const delay = setTimeout(() => {
                              handleFocusText();
                              clearTimeout(delay);
                         }, 200);
                    }
                    break;
               case 4: // xoa text
                    handleDeleteText();
                    break;
               default:
                    break;
          }
          handleClickMenuItem(id);
     };

     return (
          <>
               <VTMenuList
                    open={!!anchorContexMenu}
                    top={top}
                    left={left}
                    onClose={handleClose}
                    dataMenu={dataContextMenu}
                    onClickMenuItem={(id) => clickMenuItem(id)}
               />
          </>
     );
}
