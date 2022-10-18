import { Card, Input, Button, Text, Loading } from "@nextui-org/react";
import { useState, Fragment } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import useInput from "../hooks/useInput";

const NewCustomer = (props) => {
  const [loading, setLoading] = useState();
  const {
    inputValue: nameValue,
    error: nameError,
    isValid: nameValid,
    inputHandler: nameHandler,
    blurHandler: nameBlur,
    clearInput: clearCame,
  } = useInput((value) => value !== "");

  const {
    inputValue: cityValue,
    error: cityError,
    isValid: cityValid,
    inputHandler: cityHandler,
    blurHandler: cityBlur,
    clearInput: clearCity,
  } = useInput((value) => value !== "");

  const submitHandler = (event) => {
    event.preventDefault();
    if (!nameBlur && !cityValid) {
      return;
    }
    setLoading(true);
    fetch("")
      .then((res) => {
        if (!res.ok) {
          throw new Error("There was an error while trying to post!");
        }
        return res.json();
      })
      .then((data) => {
        props.push(data);
        clearCame();
        clearCity();
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <Card variant="bordered" className="cardShadow" css={{ mw: "550px" }}>
      <Card.Header>
        <Text b>New Customer</Text>
      </Card.Header>
      <Card.Divider />
      <Card.Body>
        <form
          className="imeiForm"
          aria-label="Customer Form"
          onSubmit={submitHandler}
        >
          <Input
            aria-label="Customer Name"
            placeholder="Customer Name"
            type="text"
            size="sm"
            bordered
            value={nameValue}
            onChange={nameHandler}
            onBlur={nameBlur}
            color={nameError ? "error" : "default"}
            clearable
          />
          <Input
            aria-label="City Name"
            placeholder="City"
            type="text"
            bordered
            size="sm"
            value={cityValue}
            onChange={cityHandler}
            onBlur={cityBlur}
            color={cityError ? "error" : "default"}
            clearable
          />
          <Button
            css={{ w: "fit-content", alignSelf: "flex-end" }}
            type="submit"
            color="primary"
            auto
            size="sm"
            disabled={cityValid && nameValid ? false : true}
          >
            {loading ? (
              <Loading type="spinner" />
            ) : (
              <Fragment>
                <AiOutlinePlus />
                Add
              </Fragment>
            )}
          </Button>
        </form>
      </Card.Body>
    </Card>
  );
};

export default NewCustomer;
