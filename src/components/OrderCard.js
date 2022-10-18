import { Card, Text, Divider } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionCard = motion(Card);

const OrderCard = (props) => {
  return (
    <Link to={`/order/${props.id}`} className="linkCard">
      <MotionCard
        variant="flat"
        css={{ mw: "550px", cursor: "pointer" }}
        className="cardShadow"
        whileTap={{ scale: 0.9 }}
      >
        <Card.Header
          css={{ display: "inline-flex", justifyContent: "space-between" }}
        >
          <Text b size="13px">
            {props.name}
          </Text>
          <Text b size="13px">
            {props.date}
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
          {props.products.map((product, index) => {
            return (
              <Text
                key={index}
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
                {product.name} ({product.codes.length})
              </Text>
            );
          })}
        </Card.Body>
      </MotionCard>
    </Link>
  );
};

export default OrderCard;
