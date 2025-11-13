/* eslint-disable radix */
import { FC } from "react";
import { useSelector } from "react-redux";

import { convertLongLat, formatMinuteAndSec } from "@/utils/convert";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export const FooterMouseCoordinate: FC = () => {
     const { t } = useTranslation();
     const mouseCoordinate = useSelector((state: any) => state.mapSD.mouseCoordinate);

     // convert lng lat to {degree, minute, second, direction}
     const longitude = convertLongLat(mouseCoordinate.lng, "longitude");
     const latitude = convertLongLat(mouseCoordinate.lat, "latitude");

     return (
          <Box className="FooterMouseCoordinate__container">
               <Box className="FooterMouseCoordinate__info">
                    <Typography>
                         {t("Lat")}: {latitude.degree}°{formatMinuteAndSec(latitude.minute)}’
                         {formatMinuteAndSec(latitude.second)}’’{latitude.direction}
                    </Typography>
                    <Typography style={{ marginLeft: "15px" }}>
                         {t("Lng")}: {longitude.degree}°{formatMinuteAndSec(longitude.minute)}’
                         {formatMinuteAndSec(longitude.second)}’’{longitude.direction}
                    </Typography>
               </Box>
          </Box>
     );
};
