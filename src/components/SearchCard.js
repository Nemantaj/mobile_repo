import { Card, Text, Divider } from "@nextui-org/react";
import { Link } from "react-router-dom";

const SearchCard = ({ id, order, product, code }) => {
  return (
    <Link to={`/order/${id}`} className="linkCard">
      <Card
        variant="flat"
        css={{ marginBottom: "0.5rem", cursor: "pointer", w: "100%" }}
        className="cardShadow"
      >
        <Card.Header
          css={{ display: "inline-flex", justifyContent: "space-between" }}
        >
          <Text b size="13px">
            {order.name}
          </Text>
          <Text b size="13px">
            {order.date.slice(0, 10)}
          </Text>
        </Card.Header>
        <Divider />
        <Card.Body
          css={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            w: "100%",
            py: "10px",
          }}
        >
          <Text b size="13px">
            {product.name}
          </Text>
          <Text b size="13px">
            {code}
          </Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default SearchCard;
