import { Link } from "react-router-dom";
import { Drawer, Icon, ListItemButton } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import { setPrivilegeTabs, setSelectedItem } from "@/slices/td/drawerSlice";
import { Privilege } from "@/types";
import { useEffect, useRef } from "react";
interface Props {
     width: string;
     items: {
          label: string;
          icon_name: string;
          route?: string;
          id?: string | null;
          parentId?: string;
     }[];
}

const checkIfRootPrivilege = (itemId: string, privilegeList: Array<Privilege>) => {
     const privilege = privilegeList.find((item: Privilege) => item.id === itemId);
     if (privilege && privilege.parent_id === null) return true;
     return false;
};

const searchChildPrivileges = (parentId: string, privilegeList: Array<Privilege>) => {
     const childPrivileges: Array<Privilege> = privilegeList.filter(
          (item: Privilege) => item.parent_id === parentId
     );
     return childPrivileges;
};

const TDDrawer = (props: Props) => {
     const dispatch = useDispatch();
     const { selectedItem, privileges } = useSelector((state: any) => state.drawer);

     const privilegesRef = useRef(privileges);

     const handleClickDrawerItem = (itemId: string) => {
          if (checkIfRootPrivilege(itemId, privilegesRef.current) || itemId === null)
               dispatch(setSelectedItem(itemId));
          else {
               const childPrivileges = searchChildPrivileges(itemId, privilegesRef.current);
               dispatch(setPrivilegeTabs(childPrivileges));
          }
     };

     useEffect(() => {
          privilegesRef.current = privileges;
     }, [privileges]);

     return (
          <Drawer
               sx={{
                    width: props.width,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                         width: props.width,
                         boxSizing: "border-box",
                    },
               }}
               variant="permanent"
               anchor="left"
          >
               <Toolbar />
               <List>
                    {props.items.map((item) => {
                         return (
                              <ListItemButton
                                   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                   // @ts-ignore
                                   onClick={() => handleClickDrawerItem(item.id)}
                                   selected={selectedItem === item.id}
                                   key={item.id}
                                   component={Link}
                                   to={`./${item.route}`}
                              >
                                   <ListItemIcon>
                                        <Icon
                                             baseClassName="icomoon"
                                             className={`${item.icon_name}`}
                                        />
                                   </ListItemIcon>
                                   <ListItemText primary={item.label} />
                              </ListItemButton>
                         );
                    })}
               </List>
          </Drawer>
     );
};
export default TDDrawer;
