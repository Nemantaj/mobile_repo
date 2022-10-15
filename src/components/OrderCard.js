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
            {new Date(props.date).toLocaleDateString("en-US")}
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
          {props.products.length > 0 &&
            props.products.map((doc, index) => {
              return (
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
                  {doc.name} ({doc.codes.length})
                </Text>
              );
            })}
        </Card.Body>
      </Card>
    </Link>
  );
};

export default OrderCard;
