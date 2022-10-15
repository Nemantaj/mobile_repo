import { Text, Card, Collapse, Button, Divider } from "@nextui-org/react";
import { Fragment,useEffect,useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import "./Home.css";

const Orders = () => {
  const [data, setdata] = useState(null)
  const navigate = useNavigate();
  const params = useParams()
  const id = params.id
  useEffect(() => {
    fetch(`/order/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error occured while trying to fetch!");
        }
        return res.json();
      })
      .then((dta) => {
        console.log(dta);
        setdata(dta)
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);
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
            <Text b>{data && data.name}</Text>
            <Text css={{ mt: "20px" }} size="12px">
              Order Date
            </Text>
            <Text b>{data && data.date.slice(0,10)}</Text>
          </Card.Header>
          <Divider />
          <Card.Body css={{ p: "10px" }}>
            <Collapse
              subtitle="Products"
              css={{ color: "black" }}
              divider={false}
            >
              {data && data.products.map(product => {
                return <Card variant="bordered" css={{ bgColor: "$accents0",marginBottom: "0.5rem"}}>
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
                      Variant
                    </Text>
                    <Text b size="13px">
                      {product.details}
                    </Text>
                    <Text css={{ mt: "10px" }} size="12px">
                      Product Name
                    </Text>
                    <Text b size="13px">
                      {product.name}
                    </Text>
                  </Card.Header>
                  <Divider />
                  <Card.Body className="collapseBody">
                    {product.codes.map(code => {
                      return <li>{code}</li>
                    })}
                  </Card.Body>
                </Card>
              })}
            </Collapse>
          </Card.Body>
        </Card>
      </div>
    </Fragment>
  );
};

export default Orders;
