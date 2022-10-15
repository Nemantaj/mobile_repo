import { useState } from "react";
import { Text, Button, Card, Input, Divider } from "@nextui-org/react";
import AddModal from "../components/AddModal";
import { Fragment } from "react";
import {
  AiFillCloseCircle,
  AiOutlineArrowLeft,
  AiOutlineSave,
  AiOutlinePlus,
} from "react-icons/ai";
import useInput from "../hooks/useInput";
import { useNavigate } from "react-router-dom";

import "./Home.css";

const NewOrder = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [products, setProducts] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));

  const {
    inputValue: nameValue,
    error: nameError,
    isValid: nameValid,
    inputHandler: nameHandler,
    blurHandler: nameBlur,
    clearInput: clearName,
  } = useInput((value) => value !== "");

  const addToProduct = (data) => {
    const newProd = [...products, data];
    return setProducts(newProd);
  };

  const removeProduct = (index) => {
    const newProd = [...products];
    let splicedProd = newProd.filter((doc, i) => {
      return index !== i;
    });
    return setProducts(splicedProd);
  };

  const submitHandler = () => {
    if (!nameValid && products.length == 0) {
      return;
    }

    const orderData = { orderName: nameValue, date: date, products: products };
    console.log(orderData);
  };

  return (
    <Fragment>
      <div className="header">
        <Text>NEW ORDER</Text>
        <div className="newOrderAction">
          <Button auto flat rounded size="sm" onClick={() => navigate("/")}>
            <AiOutlineArrowLeft />
          </Button>
          <Button
            auto
            size="sm"
            color="success"
            rounded
            onClick={submitHandler}
            disabled={nameValid && products.length > 0 ? false : true}
          >
            <AiOutlineSave /> Save
          </Button>
        </div>
      </div>
      <div className="orderDetails">
        <Card
          variant="flat"
          css={{
            mw: "550px",
            px: "10px",
            py: "20px",
            textAlign: "start",
          }}
          className="newOrderForm cardShadow"
        >
          <Input
            label={nameError ? "Party Name Required *" : "Party Name"}
            type="text"
            placeholder="Party Name"
            css={{ w: "100%" }}
            bordered
            value={nameValue}
            onChange={nameHandler}
            onBlur={nameBlur}
            color={nameError ? "error" : "default"}
            aria-label="Party Name"
          />
          <Input
            bordered
            type="date"
            label="Order Date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            aria-label="Order Date"
          />
          <Button
            auto
            color="secondary"
            css={{ w: "fit-content", alignSelf: "flex-end" }}
            size="sm"
            onClick={() => setVisible(!visible)}
            rounded
          >
            <AiOutlinePlus />
            Add a Product
          </Button>

          {products.length > 0 && (
            <Fragment>
              <Divider />
              <div className="addedProducts">
                <Text h4>Products</Text>
                {products.length > 0 &&
                  products.map((doc, index) => {
                    return (
                      <div key={index} className="imeis">
                        <Text b size="14px">
                          {doc.nameValue} ({doc.barcode.length})
                        </Text>
                        <Button
                          auto
                          size="xs"
                          flat
                          color="error"
                          onClick={() => removeProduct(index)}
                        >
                          <AiFillCloseCircle />
                        </Button>
                      </div>
                    );
                  })}
              </div>
            </Fragment>
          )}
        </Card>
      </div>
      <AddModal
        addToProduct={addToProduct}
        visible={visible}
        closeHandler={() => setVisible(false)}
      />
    </Fragment>
  );
};

export default NewOrder;
