import React, { useState, useEffect, useCallback, CSSProperties } from "react";
import { useMediaQuery, Theme } from "@mui/material";
import { subDays } from "date-fns";

import Welcome from "./welcome/Welcome";
import MonthlyRevenue from "./monthlyRevenue/MonthlyRevenue";
import NbNewOrders from "./newOrders/NbNewOrders";
import PendingOrders from "./pendingOrders/PendingOrders";
import PendingReviews from "./pendingReviews/PendingReviews";
import NewCustomers from "./newCustomer/NewCustomers";
import {
     reviews as apiReviews,
     recentOrders as apiRecentOrders,
     customers as apiCustomers,
} from "../utils/index";

interface OrderStats {
     revenue: number;
     nbNewOrders: number;
     pendingOrders: any[];
}

interface CustomerData {
     [key: string]: any;
}

interface State {
     nbNewOrders?: number;
     nbPendingReviews?: number;
     pendingOrders?: any[];
     pendingOrdersCustomers?: CustomerData;
     pendingReviews?: any[];
     pendingReviewsCustomers?: CustomerData;
     recentOrders?: any[];
     revenue?: string;
}

const styles = {
     flex: { display: "flex" },
     flexColumn: { display: "flex", flexDirection: "column" },
     leftCol: { flex: 1, marginRight: "0.5em" },
     rightCol: { flex: 1, marginLeft: "0.5em" },
     singleCol: { marginTop: "1em", marginBottom: "1em" },
};

const Spacer = () => <span style={{ width: "1em" }} />;
const VerticalSpacer = () => <span style={{ height: "1em" }} />;

export function Dashboard() {
     const [state, setState] = useState<State>({});
     const isXSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
     const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
     console.log(isXSmall, isSmall);

     const fetchOrders = async () => {
          const recentOrders = apiRecentOrders;
          const aggregations = recentOrders
               .filter((order) => order.status !== "cancelled")
               .reduce(
                    (stats: OrderStats, order) => {
                         if (order.status !== "cancelled") {
                              stats.revenue += order.total;
                              stats.nbNewOrders++;
                         }
                         if (order.status === "ordered") {
                              stats.pendingOrders.push(order);
                         }
                         return stats;
                    },
                    {
                         revenue: 0,
                         nbNewOrders: 0,
                         pendingOrders: [],
                    }
               );
          setState((state) => ({
               ...state,
               recentOrders,
               revenue: aggregations.revenue.toLocaleString(undefined, {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
               }),
               nbNewOrders: aggregations.nbNewOrders,
               pendingOrders: aggregations.pendingOrders,
          }));
          const customers = apiCustomers;
          setState((state) => ({
               ...state,
               pendingOrdersCustomers: customers.reduce((prev: CustomerData, customer) => {
                    prev[customer.id] = customer; // eslint-disable-line no-param-reassign
                    return prev;
               }, {}),
          }));
     };

     const fetchReviews = async () => {
          const reviews = apiReviews;
          const nbPendingReviews = reviews.reduce((nb: number) => ++nb, 0);
          const pendingReviews = reviews.slice(0, Math.min(10, reviews.length));
          setState((state) => ({ ...state, pendingReviews, nbPendingReviews }));
          const customers = apiCustomers;
          setState((state) => ({
               ...state,
               pendingReviewsCustomers: customers.reduce((prev: CustomerData, customer) => {
                    prev[customer.id] = customer; // eslint-disable-line no-param-reassign
                    return prev;
               }, {}),
          }));
     };
     useEffect(() => {
          fetchOrders();
          fetchReviews();
     }, []); // eslint-disable-line react-hooks/exhaustive-deps

     const {
          nbNewOrders,
          nbPendingReviews,
          pendingOrders,
          pendingOrdersCustomers,
          pendingReviews,
          pendingReviewsCustomers,
          revenue,
          recentOrders,
     } = state;
     return isXSmall ? (
          <div>
               <div style={styles.flexColumn as CSSProperties}>
                    <Welcome />
                    <MonthlyRevenue value={revenue} />
                    <VerticalSpacer />
                    <NbNewOrders value={nbNewOrders} />
                    <VerticalSpacer />
                    <PendingOrders orders={pendingOrders} customers={pendingOrdersCustomers} />
               </div>
          </div>
     ) : isSmall ? (
          <div style={styles.flexColumn as CSSProperties}>
               <div style={styles.singleCol}>
                    <Welcome />
               </div>
               <div style={styles.flex}>
                    <MonthlyRevenue value={revenue} />
                    <Spacer />
                    <NbNewOrders value={nbNewOrders} />
               </div>
               <div style={styles.singleCol}>
                    <PendingOrders orders={pendingOrders} customers={pendingOrdersCustomers} />
               </div>
          </div>
     ) : (
          <>
               <Welcome />
               <div style={styles.flex}>
                    <div style={styles.leftCol}>
                         <div style={styles.flex}>
                              <MonthlyRevenue value={revenue} />
                              <Spacer />
                              <NbNewOrders value={nbNewOrders} />
                         </div>
                         <div style={styles.singleCol}>
                              <PendingOrders
                                   orders={pendingOrders}
                                   customers={pendingOrdersCustomers}
                              />
                         </div>
                    </div>
                    <div style={styles.rightCol}>
                         <div style={styles.flex}>
                              <PendingReviews
                                   nb={nbPendingReviews}
                                   reviews={pendingReviews}
                                   customers={pendingReviewsCustomers}
                              />
                              <Spacer />
                              <NewCustomers />
                         </div>
                    </div>
               </div>
          </>
     );
}
