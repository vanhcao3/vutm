import * as React from "react";
import { FC, createElement, ReactNode } from "react";
import { Card, Box, Typography, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

import cartouche from "../assets/images/cartouche.png";
import cartoucheDark from "../assets/images/cartoucheDark.png";
import { RootState } from "@/slices";
import { useSelector } from "react-redux";

interface Props {
     icon: FC<any>;
     to: string;
     title?: string;
     subtitle?: string | number;
     children?: ReactNode;
}

const useStyles = makeStyles({
     card: {
          minHeight: 60,
          display: "flex",
          flexDirection: "column",
          flex: "1",
          "& a": {
               textDecoration: "none",
               color: "inherit",
          },
     },
     main: (props: any) => ({
          overflow: "inherit",
          padding: 16,
          background: `url(${props.theme === "dark" ? cartoucheDark : cartouche}) no-repeat`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          "& .icon": {
               color: props.theme === "dark" ? "inherit" : "#dc2440",
          },
     }),
     title: {},
});

function CardWithIcon(props: Props) {
     const themeType = useSelector((state: RootState) => state.theme.type);
     const { icon, title, subtitle, to, children } = props;
     const classes = useStyles({ ...props, theme: themeType });
     return (
          <Card className={classes.card}>
               <Link to={to}>
                    <div className={classes.main}>
                         <Box width="3em" className="icon">
                              {createElement(icon, { fontSize: "large" })}
                         </Box>
                         <Box textAlign="right">
                              <Typography className={classes.title} color="textSecondary">
                                   {title}
                              </Typography>
                              <Typography variant="h5" component="h2">
                                   {subtitle || " "}
                              </Typography>
                         </Box>
                    </div>
               </Link>
               {children && <Divider />}
               {children}
          </Card>
     );
}
export default CardWithIcon;
