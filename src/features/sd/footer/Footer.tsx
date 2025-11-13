import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { FooterMouseCoordinate } from "./components/FooterMouseCoordinate";
import SDTimer from "./components/SDTimer";
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
}
const useStyles = makeStyles((theme: any) => {
     return {
          icon: {
               background: theme.palette.mode === "dark" ? theme.palette.primary.main : `#3e545b`,
          },
     };
});
const SDFooter = (props: Props) => {
     const classes = useStyles();

     return (
          <Paper className="Footer">
               <SDTimer />
               <FooterMouseCoordinate />
               {/* <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1 }}>
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
                              {props.listButtonLeft.map((item) => (
                                   <Button
                                        className={classes.icon}
                                        size="small"
                                        key={item.value}
                                        onClick={() => handleClickOnButton(item.value)}
                                        sx={{ mx: "auto" }}
                                        variant="contained"
                                   >
                                        <Icon
                                             baseClassName="icomoon"
                                             className={`${item.icon_code}`}
                                        />
                                   </Button>
                              ))}
                         </Box>
                    </Toolbar>*/}
          </Paper>
     );
};
export default SDFooter;
