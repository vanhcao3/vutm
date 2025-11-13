import { VTMenuList } from "@/components/VTMenuList/VTMenuList";
import NotificationService from "@/utils/notification";
import { Button as MUIButton } from "@mui/material";
import add from "../../../../assets/images/icons/Actions/add.svg";
import edit from "../../../../assets/images/icons/Actions/edit.png";
import copy from "../../../../assets/images/icons/Actions/copy.svg";
import { useState } from "react";

const dataMenu = [
     {
          label: "Menu 1",
          metaData: {
               id: 1,
               leftIcon: <img width={24} height={24} src={edit} alt="" />,
          },
          children: [
               {
                    label: "Icon 1",
                    metaData: {
                         id: 2,
                         rightIcon: <img width={24} height={24} src={add} alt="" />,
                         leftIcon: <img width={24} height={24} src={edit} alt="" />,
                    },
               },
               {
                    label: "Nested Menu 1",
                    metaData: {
                         rightIcon: <img width={24} height={24} src={edit} alt="" />,
                         id: 6,
                    },
                    children: [
                         {
                              label: "icon 2",
                              metaData: {
                                   id: 7,
                              },
                         },
                         {
                              label: "icon 3",
                              metaData: {
                                   id: 123,
                              },
                              children: [
                                   {
                                        label: "icon 45",
                                        metaData: {
                                             leftIcon: (
                                                  <img width={24} height={24} src={edit} alt="" />
                                             ),
                                             id: 43,
                                        },
                                   },
                                   {
                                        label: "icon 23",
                                        metaData: {
                                             id: 75,
                                        },
                                   },
                              ],
                         },
                    ],
               },
               {
                    label: "Nested Menu 2",
                    metaData: {
                         id: 8,
                    },
                    children: [
                         {
                              label: "JS ",
                              metaData: {
                                   id: 9,
                              },
                         },
                    ],
               },
          ],
     },
     {
          label: "Menu 2",
          metaData: {
               id: 569,
               leftIcon: <img width={24} height={24} src={copy} alt="" />,
          },
          children: [
               {
                    label: "Icon 345",
                    metaData: {
                         id: 43,
                    },
               },
               {
                    label: "Nested Menu 32",
                    metaData: {
                         id: 21,
                         leftIcon: <img width={24} height={24} src={edit} alt="" />,
                         rightIcon: <img width={24} height={24} src={edit} alt="" />,
                    },
                    children: [
                         {
                              label: "HTML ",
                              metaData: {
                                   leftIcon: <img width={24} height={24} src={edit} alt="" />,
                                   id: 986,
                              },
                         },
                    ],
               },
          ],
     },
     {
          label: "Menu 3",
          metaData: {
               leftIcon: <img width={24} height={24} src={edit} alt="" />,
               rightIcon: <img width={24} height={24} src={edit} alt="" />,
               id: 56,
          },
     },
];

const dataContextMenu = [
     {
          label: "Menu Context",
          metaData: {
               leftIcon: <img width={24} height={24} src={edit} alt="" />,
               rightIcon: <img width={24} height={24} src={edit} alt="" />,
               id: 52997,
          },
     },
];

export function DemoMenuList() {
     const [anchorEl, setAnchorEl] = useState(null);
     const [topMenu, setTopMenu] = useState(0);
     const [leftMenu, setLeftMenu] = useState(0);
     const [anchorContexMenu, setAnchorContexMenu] = useState(null);

     const handleClick = (e) => {
          setAnchorEl(e.currentTarget);
          setTopMenu(e.clientY);
          setLeftMenu(e.clientX);
     };

     const handleClose = () => {
          setAnchorEl(null);
          setAnchorContexMenu(null);
     };

     const handleClickMenuItem = (id_menu) => {
          NotificationService.success(`Clicked Menu Id: ${id_menu}`);
     };

     const handleContextMenu = (e) => {
          e.preventDefault();
          setAnchorContexMenu(e.currentTarget);
          setTopMenu(e.clientY);
          setLeftMenu(e.clientX);
     };

     return (
          <div>
               <div>
                    <MUIButton
                         sx={{ mx: "auto" }}
                         variant="outlined"
                         onClick={handleClick}
                         onContextMenu={handleContextMenu}
                    >
                         Nested Menu
                    </MUIButton>

                    <VTMenuList
                         open={!!anchorEl}
                         //  anchorEl={anchorEl}
                         top={topMenu}
                         left={leftMenu}
                         onClose={handleClose}
                         dataMenu={dataMenu}
                         onClickMenuItem={handleClickMenuItem}
                    />

                    <VTMenuList
                         open={!!anchorContexMenu}
                         //  anchorEl={anchorContexMenu}
                         top={topMenu}
                         left={leftMenu}
                         onClose={handleClose}
                         dataMenu={dataContextMenu}
                         onClickMenuItem={handleClickMenuItem}
                    />
               </div>
          </div>
     );
}
