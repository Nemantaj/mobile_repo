import { Card, Text, Divider } from "@nextui-org/react";
import { Link } from "react-router-dom";

const OrderCard = (props) => {
  return (
    <Link to="/order/orderId" className="linkCard">
      <Card
        variant="flat"
        css={{ mw: "550px", cursor: "pointer" }}
        className="cardShadow"
      >
        <Card.Header
          css={{ display: "inline-flex", justifyContent: "space-between" }}
        >
          <Text b size="13px">
            {props.name}
          </Text>
          <Text b size="13px">
            2022-10-14
          </Text>
        </Card.Header>
        <Divider />
        <Card.Body
          css={{
            p: "7px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <Text
            size="13px"
            css={{
              br: "20px",
              py: "5px",
              px: "10px",
              bgColor: "$blue100",
              w: "fit-content",
            }}
            color="$blue800"
            b
          >
            iPhone 12 pro max (5)
          </Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default OrderCard;
