import { Card, Text, Divider } from "@nextui-org/react";

const SearchCard = ({order,product,code}) => {
  return (
    <Card variant="flat" css={{marginBottom:"0.5rem"}}>
      <Card.Header
        css={{ display: "inline-flex", justifyContent: "space-between" }}
      >
        <Text b size="13px">
          {order.name}
        </Text>
        <Text b size="13px">
          {order.date}
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
  );
};

export default SearchCard;
