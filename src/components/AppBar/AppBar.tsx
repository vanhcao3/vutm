import * as React from "react";
import {
     Button,
     ButtonGroup,
     ClickAwayListener,
     Grow,
     Icon,
     MenuItem,
     MenuList,
     Paper,
     Popper,
     Typography,
     useTheme,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useAuth } from "@/lib/auth";
import { useEffect } from "react";
import { HOME_URL } from "@/config";
interface Props {
     title: string;
     menuItem: {
          label: string;
          value: string;
     }[];
     listButton: {
          icon: any;
          label: string;
          value: string;
     }[];
}
const TDAppBar = (props: Props) => {
     const theme = useTheme();
     const [open, setOpen] = React.useState(false);
     const anchorRef = React.useRef<any>(null);
     const { logout } = useAuth();

     useEffect(() => {
          const authChannel = new BroadcastChannel("authChannel");
          authChannel.onmessage = (event) => {
               console.log("EVENT", event);
               if (event?.data.action === "logout") {
                    window.close();
               }
          };

          return () => {
               authChannel.close();
          };
     }, []);

     const handleToggle = () => {
          setOpen((prevOpen) => !prevOpen);
     };
     const handleClickOnButton = (item: string) => {
          console.log("click on button item", item);
     };
     const handleClose = (event: any, item?: string) => {
          console.log("menu click on", item);
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
     const prevOpen = React.useRef(open);
     React.useEffect(() => {
          if (prevOpen.current === true && open === false) {
               if (anchorRef.current != null) {
                    anchorRef.current.focus();
               }
          }

          prevOpen.current = open;
     }, [open]);
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
                    }}
               >
                    <Typography variant="h6" component="div"></Typography>
                    <Typography variant="h6" component="div" color={theme.palette.text.primary}>
                         {props.title}
                    </Typography>
                    <ButtonGroup disableElevation variant="text">
                         {props.listButton.map((item) => (
                              <Button
                                   key={item.value}
                                   onClick={() => handleClickOnButton(item.value)}
                                   startIcon={item.icon}
                                   sx={{ mx: "auto" }}
                              ></Button>
                         ))}
                         <Button
                              ref={anchorRef}
                              id="composition-button"
                              aria-controls={open ? "composition-menu" : undefined}
                              aria-expanded={open ? "true" : undefined}
                              aria-haspopup="true"
                              onClick={handleToggle}
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
                    </ButtonGroup>
               </Toolbar>
          </AppBar>
     );
};
export default TDAppBar;
