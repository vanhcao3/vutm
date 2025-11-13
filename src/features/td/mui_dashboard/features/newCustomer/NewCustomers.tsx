import * as React from "react";
import { Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CustomerIcon from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom";
import { subDays } from "date-fns";
import { visitors as apiVisitors } from "../../utils/index";

import CardWithIcon from "../../components/CardWithIcon";

const NewCustomers = () => {
     const classes = useStyles();

     const aMonthAgo = subDays(new Date(), 30);
     aMonthAgo.setDate(aMonthAgo.getDate() - 30);
     aMonthAgo.setHours(0);
     aMonthAgo.setMinutes(0);
     aMonthAgo.setSeconds(0);
     aMonthAgo.setMilliseconds(0);

     const visitors = apiVisitors;

     const nb = visitors ? visitors.reduce((nb: number) => ++nb, 0) : 0;
     return (
          <CardWithIcon to="/customers" icon={CustomerIcon} title="New Customer" subtitle={nb}>
               <List>
                    {visitors
                         ? visitors.map((record: any) => (
                                <ListItem
                                     to={`/customers/${record.id}`}
                                     component={Link}
                                     key={record.id}
                                >
                                     <ListItemAvatar>
                                          <Avatar src={`${record.avatar}?size=32x32`} />
                                     </ListItemAvatar>
                                     <ListItemText
                                          primary={`${record.first_name} ${record.last_name}`}
                                     />
                                </ListItem>
                           ))
                         : null}
               </List>
               <Box flexGrow="1">&nbsp;</Box>
               <Button
                    className={classes.link}
                    component={Link}
                    to="/customers"
                    size="small"
                    color="primary"
               >
                    <Box p={1} className={classes.linkContent}>
                         All Customers
                    </Box>
               </Button>
          </CardWithIcon>
     );
};

const useStyles = makeStyles((theme) => ({
     link: {
          borderRadius: 0,
     },
     linkContent: {
          // color: theme.palette.primary.main,
     },
}));

export default NewCustomers;
