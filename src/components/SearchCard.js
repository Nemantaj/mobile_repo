import { Card, Text, Divider } from "@nextui-org/react";

const SearchCard = () => {
  return (
    <Card variant="flat">
      <Card.Header
        css={{ display: "inline-flex", justifyContent: "space-between" }}
      >
        <Text b size="13px">
          Customer Name
        </Text>
        <Text b size="13px">
          2022-10-14
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
          Product Name
        </Text>
        <Text b size="13px">
          20224564564564
        </Text>
      </Card.Body>
    </Card>
  );
};

export default SearchCard;
