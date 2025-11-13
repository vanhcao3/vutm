import { setListLayerShow } from "@/slices/sd/mapSlice";
import {
     Button,
     Checkbox,
     ClickAwayListener,
     Icon,
     ListItemText,
     MenuItem,
     MenuList,
     Paper,
     Popper,
} from "@mui/material";
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const MENU_LAYERS = [
     "LAYER_BIEN_GIOI",
     "LAYER_DUONG_THUY",
     "LAYER_HANH_CHINH_XA",
     "LAYER_HANH_CHINH_HUYEN",
     "LAYER_HANH_CHINH_TINH",
     "LAYER_DUONG_BO",
     "LAYER_DAO_LINE",
];

const LayerSelect = (props: any) => {
     const { t } = useTranslation();
     const dispatch = useDispatch();
     const anchorRef = useRef<any>(null);
     const [open, setOpen] = useState<boolean>(false);
     const { listLayerShow } = useSelector((state: any) => state.mapSD);
     const handleOpenList = () => {
          setOpen(!open);
     };

     const handleClick = (event: any, name: string) => {
          const listLayerInState: Array<string> = [...listLayerShow];

          const index = listLayerInState.findIndex((item: string) => item === name);

          if (index > -1) {
               listLayerInState.splice(index, 1);
          } else {
               listLayerInState.push(name);
          }

          dispatch(setListLayerShow(listLayerInState));
     };
     return (
          <>
               <Button {...props} ref={anchorRef} onClick={handleOpenList}>
                    <Icon baseClassName="icomoon" className={"icon-12"} />
               </Button>
               <Popper open={open} anchorEl={anchorRef.current} placement="bottom-start">
                    <ClickAwayListener onClickAway={handleOpenList}>
                         <Paper>
                              <MenuList sx={{ minWidth: "200px" }}>
                                   {MENU_LAYERS.map((name) => (
                                        <MenuItem key={name} onClick={(e) => handleClick(e, name)}>
                                             <Checkbox checked={listLayerShow.includes(name)} />
                                             <ListItemText primary={t(name)} />
                                        </MenuItem>
                                   ))}
                              </MenuList>
                         </Paper>
                    </ClickAwayListener>
               </Popper>
          </>
     );
};

export default LayerSelect;
