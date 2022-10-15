import { Text, Card, Collapse, Button, Divider } from "@nextui-org/react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./Home.css";

const Orders = () => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="header">
        <Text>Order</Text>
        <Button auto flat rounded size="sm" onClick={() => navigate("/")}>
          <AiOutlineArrowLeft />
        </Button>
      </div>
      <div className="orderDetails">
        <Card css={{ mw: "550px" }} variant="flat" className="cardShadow">
          <Card.Header
            css={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Text size="12px">Party Name</Text>
            <Text b>Custome name</Text>
            <Text css={{ mt: "20px" }} size="12px">
              Order Date
            </Text>
            <Text b>12/12/30</Text>
          </Card.Header>
          <Divider />
          <Card.Body css={{ p: "10px" }}>
            <Collapse
              subtitle="dasdas asd ad"
              css={{ color: "black" }}
              divider={false}
            >
              <Card variant="bordered" css={{ bgColor: "$accents0" }}>
                <Card.Header
                  css={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                  }}
                >
                  <Text size="12px">Product Type</Text>
                  <Text b size="13px">
                    Custome name
                  </Text>
                  <Text css={{ mt: "10px" }} size="12px">
                    Variant
                  </Text>
                  <Text b size="13px">
                    12/12/30
                  </Text>
                  <Text css={{ mt: "10px" }} size="12px">
                    Product Name
                  </Text>
                  <Text b size="13px">
                    iPhone 12 Pro Max
                  </Text>
                </Card.Header>
                <Divider />
                <Card.Body className="collapseBody">
                  <li>5646489787</li>
                  <li>5646489787</li>
                  <li>5646489787</li>
                </Card.Body>
              </Card>
            </Collapse>
          </Card.Body>
        </Card>
      </div>
    </Fragment>
  );
};

export default Orders;
