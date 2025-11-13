import * as React from "react";
import { Box, Card, CardActions, Button, Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CodeIcon from "@mui/icons-material/Code";
import { makeStyles } from "@mui/styles";
import publishArticleImage from "../../assets/images/welcome_illustration.svg";

const useStyles = makeStyles((theme: any) => {
     return {
          root: {
               background:
                    theme.palette.mode === "dark"
                         ? "#535353"
                         : `linear-gradient(to right, #8975fb 0%, #746be7 35%), linear-gradient(to bottom, #8975fb 0%, #6f4ceb 50%), #6f4ceb`,

               color: "#fff",
               padding: 20,
               marginTop: theme.spacing(2),
               marginBottom: "1em",
          },
          media: {
               background: `url(${publishArticleImage}) top right / cover`,
               marginLeft: "auto",
          },
          actions: {
               [theme.breakpoints.down("md")]: {
                    padding: 0,
                    flexWrap: "wrap",
                    "& a": {
                         marginTop: "1em",
                         marginLeft: "0!important",
                         marginRight: "1em",
                    },
               },
          },
     };
});
const Welcome = () => {
     const classes = useStyles();
     return (
          <Card className={classes.root}>
               <Box display="flex">
                    <Box flex="1">
                         <Typography variant="h5" component="h2" gutterBottom>
                              Tiltle
                         </Typography>
                         <Box maxWidth="40em">
                              <Typography variant="body1" component="p" gutterBottom>
                                   Subtile
                              </Typography>
                         </Box>
                         <CardActions className={classes.actions}>
                              <Button
                                   variant="contained"
                                   href="https://marmelab.com/react-admin"
                                   startIcon={<HomeIcon />}
                              >
                                   REACT-ADMIN SITE
                              </Button>
                              <Button
                                   variant="contained"
                                   href="https://github.com/marmelab/react-admin/tree/master/examples/demo"
                                   startIcon={<CodeIcon />}
                              >
                                   SOURCE FOR THIS DEMO
                              </Button>
                         </CardActions>
                    </Box>

                    <Box
                         display={{ xs: "none", sm: "none", md: "block" }}
                         className={classes.media}
                         width="16em"
                         height="9em"
                         overflow="hidden"
                    />
               </Box>
          </Card>
     );
};

export default Welcome;
