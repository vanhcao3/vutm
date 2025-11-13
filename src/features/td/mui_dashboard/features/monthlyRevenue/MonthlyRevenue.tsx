import * as React from "react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CardWithIcon from "../../components/CardWithIcon";

interface Props {
     value?: string;
}

const MonthlyRevenue = (props: Props) => {
     const { value } = props;
     return (
          <CardWithIcon
               to="/commands"
               icon={AttachMoneyIcon}
               title="Monthly Revenue"
               subtitle={value}
          />
     );
};

export default MonthlyRevenue;
