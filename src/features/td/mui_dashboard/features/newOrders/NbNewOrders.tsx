import * as React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import CardWithIcon from "../../components/CardWithIcon";

interface Props {
     value?: number;
}

const NbNewOrders = (props: Props) => {
     const { value } = props;
     return (
          <CardWithIcon
               to="/commands"
               icon={ShoppingCartIcon}
               title="New Orders"
               subtitle={value}
          />
     );
};

export default NbNewOrders;
