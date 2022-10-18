import {
  Text,
  Card,
  Collapse,
  Button,
  Divider,
  Loading,
} from "@nextui-org/react";
import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./Home.css";

const Orders = () => {
  const [data, setdata] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    setError(false);
    setLoading(true);
    fetch(`/orders/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error occured while trying to fetch!");
        }
        return res.json();
      })
      .then((dta) => {
        setdata(dta);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, [id]);
  return (
    <Fragment>
      <div className="header">
        <Text b>Details</Text>
        <Button auto flat rounded size="sm" onClick={() => navigate("/")}>
          <AiOutlineArrowLeft />
        </Button>
      </div>
      {loading ? (
        <div className="orderDetails">
          <Loading type="spinner" />
        </div>
      ) : (
        <div className="orderDetails">
          {error && (
            <Text
              css={{
                br: "20px",
                py: "5px",
                px: "10px",
                bgColor: "$red100",
                textAlign: "center",
              }}
              color="$red700"
              size="14px"
            >
              An error occured while trying to retrieve data! Please go back and
              try again.
            </Text>
          )}
          <Card css={{ mw: "550px" }} variant="flat" className="cardShadow">
            <Card.Header
              css={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <Text size="12px">Party Name</Text>
              <Text b>{data && data.name}</Text>
              <Text css={{ mt: "20px" }} size="12px">
                Order Date
              </Text>
              <Text b>{data && data.date.slice(0, 10)}</Text>
            </Card.Header>
            <Divider />
            <Card.Body css={{ p: "10px" }}>
              <Collapse.Group css={{ p: 0 }}>
                {data &&
                  data.products.map((product, index) => {
                    return (
                      <Collapse
                        title={product.name}
                        subtitle={product.category}
                        css={{ color: "black" }}
                        key={"Collapse"}
                      >
                        <Card
                          key={index}
                          variant="bordered"
                          css={{ bgColor: "$accents0", marginBottom: "0.5rem" }}
                        >
                          <Card.Header
                            css={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "start",
                            }}
                          >
                            <Text size="12px">Product Type</Text>
                            <Text b size="13px">
                              {product.category}
                            </Text>
                            <Text css={{ mt: "10px" }} size="12px">
                              Details
                            </Text>
                            <Text b size="13px">
                              {product.details}
                            </Text>
                            <Text css={{ mt: "10px" }} size="12px">
                              Price
                            </Text>
                            <Text b size="13px">
                              {product.price}
                            </Text>
                          </Card.Header>
                          <Divider />
                          <Card.Body className="collapseBody">
                            <ol>
                              {product.codes.map((code, index) => {
                                return <li key={index}>{code}</li>;
                              })}
                            </ol>
                          </Card.Body>
                        </Card>
                      </Collapse>
                    );
                  })}
              </Collapse.Group>
            </Card.Body>
          </Card>
        </div>
      )}
    </Fragment>
  );
};

export default Orders;
