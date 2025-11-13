import * as React from "react";
import { Avatar, Box, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CommentIcon from "@mui/icons-material/Comment";
import { Link } from "react-router-dom";

import CardWithIcon from "../../components/CardWithIcon";

interface Props {
     reviews?: any[];
     customers?: { [key: string]: any };
     nb?: number;
}

const PendingReviews = ({ reviews = [], customers = {}, nb }: Props) => {
     const classes = useStyles();
     return (
          <CardWithIcon to="/reviews" icon={CommentIcon} title="pending_reviews" subtitle={nb}>
               <List>
                    {reviews.map((record: any) => (
                         <ListItem
                              key={record.id}
                              component={Link}
                              to={`/reviews/${record.id}`}
                              alignItems="flex-start"
                         >
                              <ListItemAvatar>
                                   {customers[record.customer_id] ? (
                                        <Avatar
                                             src={`${
                                                  customers[record.customer_id].avatar
                                             }?size=32x32`}
                                             className={classes.avatar}
                                        />
                                   ) : (
                                        <Avatar />
                                   )}
                              </ListItemAvatar>

                              <ListItemText
                                   secondary={record.comment}
                                   className={classes.listItemText}
                                   style={{ paddingRight: 0 }}
                              />
                         </ListItem>
                    ))}
               </List>
               <Box flexGrow="1">&nbsp;</Box>
               <Button
                    className={classes.link}
                    component={Link}
                    to="/reviews"
                    size="small"
                    color="primary"
               >
                    <Box p={1} className={classes.linkContent}>
                         all_reviews
                    </Box>
               </Button>
          </CardWithIcon>
     );
};

const useStyles: any = makeStyles((theme) => ({
     avatar: {
          // background: theme.palette.background.paper,
     },
     listItemText: {
          overflowY: "hidden",
          height: "4em",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
     },
     link: {
          borderRadius: 0,
     },
     linkContent: {
          // color: theme.palette.primary.main,
     },
}));

export default PendingReviews;
