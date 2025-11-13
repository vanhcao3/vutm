/* eslint-disable react/jsx-key */
import * as React from "react";
import {
     Box,
     Button,
     ClickAwayListener,
     Grow,
     Icon,
     MenuItem,
     MenuList,
     Paper,
     Popper,
     Slider,
     Tooltip,
     Typography,
     useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useSelector, useDispatch } from "react-redux";

import {
     changeMapStyle,
     setDragPanable,
     setIsDrawMode,
     setViewPort,
     setZoomStepValue,
} from "@/slices/sd/mapSlice";
import { useTranslation } from "react-i18next";
import LayerSelect from "./components/LayerSelect";
import "./styles/index.scss";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";
import { HOME_URL } from "@/config";

interface Props {
     menuItem: {
          label: string;
          value: string;
     }[];
     listButtonLeft: {
          icon_code: any;
          label: string;
          value: string;
     }[];
     listButtonRight: {
          icon_code: any;
          label: string;
          value: string;
     }[];
}
const useStyles = makeStyles((theme: any) => {
     return {
          icon: {
               background: theme.palette.mode === "dark" ? theme.palette.primary.main : `#3e545b`,
          },

          iconClicked: {
               background:
                    theme.palette.mode === "dark"
                         ? theme.palette.secondary.main
                         : `rgb(185, 83, 57)`,
          },

          typo: {
               color: theme.palette.mode === "dark" ? "#fff" : "rgba(0, 0, 0, 0.87)",
          },
     };
});
const SDHeader = (props: Props) => {
     const { t } = useTranslation();
     const theme = useTheme();
     const dispatch = useDispatch();
     const [open, setOpen] = React.useState(false);
     const anchorRef = React.useRef<any>(null);
     const { logout } = useAuth();
     const { dragPan, viewPort, zoomStepValue, isDrawMode } = useSelector(
          (state: any) => state.mapSD
     );

     useEffect(() => {
          const authChannel = new BroadcastChannel("authChannel");
          authChannel.onmessage = (event) => {
               if (event?.data.action === "logout") {
                    window.location.href = "/auth/login";
               }
          };
          return () => {
               authChannel.close();
          };
     });

     const handleToggle = () => {
          setOpen((prevOpen) => !prevOpen);
     };

     const handleOnButtonMapStyle = (item: string) => {
          if (item !== "3d") {
               dispatch(changeMapStyle(item));
          } else {
               window.location.href = "/sd/map3d";
          }
     };

     const zoomIn = () => {
          const newViewPort = { ...viewPort };
          newViewPort.zoom = viewPort.zoom + zoomStepValue;
          dispatch(setViewPort(newViewPort));
     };

     const zoomOut = () => {
          const newViewPort = { ...viewPort };
          newViewPort.zoom = viewPort.zoom - zoomStepValue;
          dispatch(setViewPort(newViewPort));
     };

     const changeDragPanable = () => {
          dispatch(setDragPanable(!dragPan));
     };

     const handleChangeSlider = (event: Event, newValue: number | number[]) => {
          if (typeof newValue === "number") {
               dispatch(setZoomStepValue(newValue));
          }
     };

     const handleClose = (event: any, item?: string) => {
          if (anchorRef.current?.contains(event.target)) {
               return;
          }

          if (item === "Logout") {
               logout(HOME_URL);
          }

          setOpen(false);
     };

     function handleListKeyDown(event: any) {
          if (event.key === "Tab") {
               event.preventDefault();
               setOpen(false);
          } else if (event.key === "Escape") {
               setOpen(false);
          }
     }

     const handleSetUpDrawMode = () => {
          dispatch(setIsDrawMode(!isDrawMode));
     };
     // const prevOpen = React.useRef(open);
     // React.useEffect(() => {
     //      if (prevOpen.current === true && open === false) {
     //           if (anchorRef.current != null) {
     //                anchorRef.current.focus();
     //           }
     //      }

     //      prevOpen.current = open;
     // }, [open]);
     const classes = useStyles();
     return (
          <AppBar
               position="fixed"
               sx={{
                    width: `100%`,
                    zIndex: "tooltip",
                    bgcolor: theme.palette.background.default,
               }}
          >
               <Toolbar
                    sx={{
                         display: "flex",
                         justifyContent: "space-between",
                         padding: 0,
                    }}
               >
                    <Box
                         sx={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-around",
                              gap: "0.5em",
                         }}
                    >
                         <Button
                              className={classes.icon}
                              size="small"
                              id="zoomIn"
                              onClick={zoomIn}
                              sx={{ mx: "auto" }}
                              variant="contained"
                         >
                              <Icon baseClassName="icomoon" className={"icon-toolbar-19"} />
                         </Button>

                         <Button
                              className={classes.icon}
                              size="small"
                              id="zoomOut"
                              onClick={zoomOut}
                              sx={{ mx: "auto" }}
                              variant="contained"
                         >
                              <Icon baseClassName="icomoon" className={"icon-toolbar-18"} />
                         </Button>

                         <Box sx={{ display: "flex", flexDirection: "row", margin: "0 10px 0 0" }}>
                              <Typography
                                   className={classes.typo}
                                   variant="body1"
                                   component="div"
                                   sx={{ width: 250, margin: "auto 10px" }}
                              >
                                   {t("Zoom.Step")}: {zoomStepValue}
                              </Typography>
                              <Slider
                                   sx={{ my: "auto" }}
                                   defaultValue={0}
                                   value={zoomStepValue}
                                   step={0.5}
                                   min={0}
                                   max={3}
                                   onChange={handleChangeSlider}
                              />
                         </Box>

                         <Button
                              className={dragPan ? classes.icon : classes.iconClicked}
                              size="small"
                              id="dragPan"
                              onClick={changeDragPanable}
                              sx={{ mx: "auto" }}
                              variant="contained"
                         >
                              <Icon baseClassName="icomoon" className={`icon-toolbar-15`} />
                         </Button>
                         <Button
                              className={!isDrawMode ? classes.icon : classes.iconClicked}
                              size="small"
                              id="dragPan"
                              onClick={handleSetUpDrawMode}
                              sx={{ mx: "auto", padding: "1px 1px" }}
                              variant="contained"
                         >
                              <Icon baseClassName="icomoon" className={`icon-toolbar-5`} />
                         </Button>
                    </Box>
                    <Box
                         sx={{
                              display: "flex",
                              flexDirection: "row",
                              gap: "0.5em",
                         }}
                    >
                         <LayerSelect
                              className={classes.icon}
                              size="small"
                              sx={{ mx: "auto", padding: "1px 1px" }}
                              variant="contained"
                         />

                         {props.listButtonRight.map((item, index) => (
                              <Tooltip title={item.value} placement="bottom" key={index}>
                                   <Button
                                        className={classes.icon}
                                        key={index}
                                        variant="contained"
                                        onClick={() => handleOnButtonMapStyle(item.value)}
                                        sx={{ mx: "auto" }}
                                   >
                                        <Icon
                                             baseClassName="icomoon"
                                             className={`iconMapStyle__${item.value}`}
                                        />
                                   </Button>
                              </Tooltip>
                         ))}
                         <Button
                              className={classes.icon}
                              ref={anchorRef}
                              id="composition-button"
                              variant="contained"
                              aria-controls={open ? "composition-menu" : undefined}
                              aria-expanded={open ? "true" : undefined}
                              aria-haspopup="true"
                              onClick={handleToggle}
                              sx={{ minWidth: "60px" }}
                         >
                              <Icon baseClassName="icomoon" className="icon-user" />
                         </Button>
                         <Popper
                              open={open}
                              anchorEl={anchorRef.current}
                              role={undefined}
                              placement="bottom-start"
                              transition
                              disablePortal
                         >
                              {({ TransitionProps, placement }) => (
                                   <Grow
                                        {...TransitionProps}
                                        style={{
                                             transformOrigin:
                                                  placement === "bottom-start"
                                                       ? "left top"
                                                       : "left bottom",
                                        }}
                                   >
                                        <Paper>
                                             <ClickAwayListener onClickAway={handleClose}>
                                                  <MenuList
                                                       autoFocusItem={open}
                                                       id="composition-menu"
                                                       aria-labelledby="composition-button"
                                                       onKeyDown={handleListKeyDown}
                                                       sx={{ minWidth: "200px" }}
                                                  >
                                                       {props.menuItem.map((item) => (
                                                            <MenuItem
                                                                 key={item.value}
                                                                 onClick={(e) =>
                                                                      handleClose(e, item.value)
                                                                 }
                                                            >
                                                                 {item.label}
                                                            </MenuItem>
                                                       ))}
                                                  </MenuList>
                                             </ClickAwayListener>
                                        </Paper>
                                   </Grow>
                              )}
                         </Popper>
                    </Box>
               </Toolbar>
          </AppBar>
     );
};
export default SDHeader;
