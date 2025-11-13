import React, { Suspense, useContext, useEffect, useLayoutEffect, useState, useTransition , useCallback } from "react";
import { RootState } from "@/slices";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount, setValue } from "@/slices/counterSlice";
import { ContentLayout } from "@/components/Layout";
import { useTranslation } from "react-i18next";

import { SquareWorker } from "@/workers/square.worker";
import WorkerBuilder from "@/workers/worker-builder";
import { Icon, Button as MUIButton, Box, Typography, TextField, LinearProgress } from "@mui/material";
import { SocketContext } from "@/lib/socket";

import logo from '../../../../assets/logo.svg';
// import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Grid2 from '@mui/material/GridLegacy/GridLegacy';
import NotificationService from "@/utils/notification";

const TestLoading = React.lazy(() => {
     return new Promise(resolve => setTimeout(resolve, 5000)).then(() =>
          import('./TestLoading')
     )
})
// import { TestLoading } from "./TestLoading";
export function Counter() {
     // return (
     //      <ContentLayout title="Test react 18">
     //           <Grid2 container spacing={1} className="divide-x divide-green-500">
     //                <Grid2 xs={8}>
     //                     <Grid2 container spacing={1}>
     //                          {
     //                               Array.from(Array(9), (_, index) => {
     //                                    return (<Grid2 xs={4} key={index} ><div key={index} className="bg-blue-500 rounded-md flex items-center justify-center text-white text-2xl">{index}</div></Grid2>)
     //                               })
     //                          }
     //                     </Grid2>
     //                </Grid2>
     //                <Grid2 xs={2}>
     //                     <div className="border">xs=2</div>
     //                </Grid2>
     //                <Grid2 xs={2}>
     //                     <div className="border">xs=2</div>
     //                </Grid2>
     //                <Grid2 xs={4}>
     //                     <div className="border">xs=4</div>
     //                </Grid2>
     //                <Grid2 xs={4}>
     //                     <div className="border">xs=4</div>
     //                </Grid2>
     //                <Grid2 xs={4}>
     //                     <div className="border">xs=4</div>
     //                </Grid2>
     //           </Grid2>
     //      </ContentLayout>
     // )
     // demo startTransition for concurent react
     // const [search_text, setSearchText] = useState('');
     // const [search_result, setSearchResult] = useState<any>();
     // const [isPending, startTransition] = useTransition();

     // const handleChange = (e: any) => {
     //      setSearchText(e.target.value);
     // }

     // useEffect(() => {
     //      if (search_text === '') {
     //           setSearchResult(null);
     //      } else {
     //           const rows = Array.from(Array(5000), (_, index) => {
     //                return (
     //                     <div key={index}>
     //                          <img src={logo} className="App-logo" alt='logo' />
     //                          <div>{index + 1}.{search_text}</div>
     //                     </div>
     //                )
     //           })
     //           const list = <div>{rows}</div>
     //           // console.log(1);
     //           startTransition(() => {
     //                setSearchResult(list);
     //                // console.log(2);
     //           })
     //           // console.log(3);
     //      }
     // }, [search_text]);
     // return (
     //      <ContentLayout title="Test react 18">
     //           <div className="bg-green-200">
     //                {/* <input type="text" value={search_text} onChange={handleChange} className="border border-red" /> */}
     //                <TextField value={search_text} onChange={handleChange}></TextField>
     //                <div>
     //                     {isPending && <span>Loading ...</span>}
     //                     {!isPending && search_result}
     //                </div>
     //           </div>
     //      </ContentLayout>
     // )

     // demo auto batching
     const [count, setCount] = useState(0);
     const [flag, setFlag] = useState(false);
     const { t, i18n } = useTranslation();
     const handleClick = (e: any) => {
          console.log("========click========");
          fecthSomething().then(() => {
               setCount((c) => c + 1);
               setFlag((f) => !f);
          })
     }
     const notificationClick = (event) => {
          console.log("event", event)
     }
     return (
          <ContentLayout title="Test react 18">
               <div className="bg-blue-200">
                    <Suspense fallback={<div><LinearProgress /></div>}>
                         <TestLoading>
                              <MUIButton onClick={handleClick} variant="contained">Click me</MUIButton>
                              <h1>{count}</h1>
                              <LogEvents />
                         </TestLoading>
                    </Suspense>
                    <MUIButton sx={{ mx: "auto" }} onClick={() => NotificationService.success(t("success"), (event) => notificationClick(event))}>
                         <Icon baseClassName="icomoon" className="icon-notification" />
                    </MUIButton>
                    <MUIButton sx={{ mx: "auto" }} onClick={() => NotificationService.error(t("error"))}>
                         <Icon baseClassName="icomoon" className="icon-notification" />
                    </MUIButton>
               </div>
          </ContentLayout>
     )
}

const LogEvents = () => {
     useLayoutEffect(() => {
          console.log("Commit");
     });
     console.log("Render");
     return null;
}
const fecthSomething = () => {
     return new Promise((resolve) => setTimeout(resolve, 100));
}
// old source code
// const workerInstance = new WorkerBuilder(SquareWorker, "square-worker");
// export function Counter() {
//      // use state to reset when init
//      const [count_test, setCountState] = useState(0);
//      const { t, i18n } = useTranslation();
//      const count = useSelector((state: RootState) => state.counter.value);
//      const dispatch = useDispatch();
//      const socket = useContext(SocketContext);

//      const langChannel = new BroadcastChannel("langChannel");

//      const changeLanguage = (lng: string) => {
//           i18n.changeLanguage(lng);
//           langChannel.postMessage({ language: lng });
//      };

//      const handleSocketEvent = useCallback((data) => {
//           console.log("SOCKET UPDATE", data);
//      }, []);
//      const calculateSquare = () => {
//           workerInstance.postMessage(count);
//      };
//      //use effect to reset value at providers when destroy
//      useEffect(() => {
//           workerInstance.onmessage = (message: any) => {
//                if (message) {
//                     console.log("Message from worker", message.data.msg);
//                     dispatch(setValue(message.data.msg));
//                }
//           };

//           dispatch(setValue(0));
//           socket.emit("registerSocket", {
//                id: "fdd66d5b-82cf-46db-bfb2-68355b1035ce",
//                from: "TD",
//           });
//           socket.emit("receiverPlot", "");
//           socket.on("UPDATE_ALL", handleSocketEvent);
//           return () => {
//                socket.off("UPDATE_ALL");
//           };
//      }, [socket]);
//      return (
//           <ContentLayout title="Counter">
//                <Box
//                     sx={{
//                          display: "flex",
//                          flexDirection: "column",
//                          gap: "12px",
//                     }}
//                >
//                     <MUIButton variant="contained" onClick={() => dispatch(increment())}>
//                          Increment
//                     </MUIButton>

//                     <Typography variant="body1" component="div">
//                          {count}
//                     </Typography>
//                     <MUIButton
//                          variant="contained"
//                          onClick={() => {
//                               setCountState(count_test + 1);
//                          }}
//                     >
//                          Increment test
//                     </MUIButton>

//                     <Typography variant="body1" component="div">
//                          {count_test}
//                     </Typography>
//                     <MUIButton variant="contained" onClick={() => dispatch(decrement())}>
//                          Decrement
//                     </MUIButton>
//                     <MUIButton variant="contained" onClick={() => dispatch(incrementByAmount(12))}>
//                          Increament By Amount
//                     </MUIButton>
//                     <Typography variant="body1" component="div">
//                          {t("test.hello")}
//                     </Typography>
//                     <MUIButton variant="contained" onClick={() => changeLanguage("vi")}>
//                          Change language VI
//                     </MUIButton>
//                     <MUIButton variant="contained" onClick={() => changeLanguage("en")}>
//                          Change language EN
//                     </MUIButton>
//                     <MUIButton variant="contained" onClick={() => calculateSquare()}>
//                          Square
//                     </MUIButton>
//                     <MUIButton sx={{ mx: "auto" }} onClick={() => toast.success(t("go_home"))}>
//                          <Icon baseClassName="icomoon" className="icon-notification" />
//                     </MUIButton>
//                </Box>
//           </ContentLayout>
//      );
// }
