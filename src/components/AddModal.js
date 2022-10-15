import { useState } from "react";
import { Modal, Text, Input, Button, Divider } from "@nextui-org/react";
import useInput from "../hooks/useInput";
import { AiFillCloseCircle } from "react-icons/ai";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const selctValues = [
  { title: "iPhone", value: "iphone" },
  { title: "iPod", value: "ipod" },
  { title: "AirPods", value: "airpods" },
];

const AddModal = (props) => {
  const [imeis, setImeis] = useState([]);
  const [category, setCategory] = useState(null);
  const [isValid, setIsValid] = useState(true);

  const {
    inputValue: detailValue,
    error: detailError,
    isValid: detailValid,
    inputHandler: detailHandler,
    blurHandler: detailBlur,
    clearInput: cleardetail,
  } = useInput((value) => value !== "");

  const {
    inputValue: nameValue,
    error: nameError,
    isValid: nameValid,
    inputHandler: nameHandler,
    blurHandler: nameBlur,
    clearInput: clearName,
  } = useInput((value) => value !== "");

  const {
    inputValue: priceValue,
    error: priceError,
    isValid: priceValid,
    inputHandler: priceHandler,
    blurHandler: priceBlur,
    clearInput: clearPrice,
  } = useInput((value) => value !== "");

  const {
    inputValue: imeiValue,
    error: imeiError,
    isValid: imeiValid,
    inputHandler: imeiHandler,
    blurHandler: imeiBlur,
    clearInput: clearImeis,
  } = useInput((value) => value.length == 15);

  const pushImeiHandler = () => {
    const newImei = [...imeis, imeiValue];
    setImeis(newImei);
    return clearImeis();
  };

  const removeImeiHandler = (index) => {
    const newImeis = [...imeis];
    let splicedImeis;
    if (newImeis.length == 1) {
      splicedImeis = [];
    } else {
      splicedImeis = newImeis.splice(index, 1);
    }
    return setImeis(splicedImeis);
  };

  const closeHandler = () => {
    setImeis([]);
    clearName();
    clearPrice();
    cleardetail();
    return props.closeHandler();
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      nameValid &&
      detailValid &&
      priceValid &&
      imeis.length > 0 &&
      category !== ""
    ) {
      setIsValid(true);
      props.addToProduct({
        category,
        nameValue,
        detailValue,
        priceValue,
        barcode: imeis,
      });
      return closeHandler();
    }

    return setIsValid(false);
  };

  return (
    <Modal
      fullScreen
      open={props.visible}
      onClose={closeHandler}
      preventClose
      css={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Modal.Header
        css={{
          display: "inline-flex",
          justifyContent: "space-between",
          alignItems: "center",
          mw: "550px",
          w: "100%",
        }}
      >
        <Text>Add IMEI</Text>
        <Button auto size="sm" rounded color="error" onClick={closeHandler}>
          Close
        </Button>
      </Modal.Header>
      <Divider />
      <Modal.Body css={{ w: "100%", mw: "550px" }}>
        <form className="imeiForm" onSubmit={submitHandler}>
          <div className="selectCustom">
            <select
              id="select"
              onChange={(event) => setCategory(event.target.value)}
              aria-label="Select Category"
            >
              <option defaultValue selected disabled value="">
                Select a category
              </option>
              {selctValues.map((doc, index) => {
                return (
                  <option key={index} value={doc.value}>
                    {doc.title}
                  </option>
                );
              })}
            </select>
          </div>
          <Input
            label={nameError ? "Product Name Required *" : "Product Name"}
            placeholder="Enter Product Name"
            rounded
            bordered
            onChange={nameHandler}
            onBlur={nameBlur}
            color={nameError ? "error" : "default"}
            value={nameValue}
            aria-label="Name"
          />
          <Input
            label={detailError ? "Details Required *" : "Details"}
            placeholder="Enter Details"
            rounded
            bordered
            onChange={detailHandler}
            onBlur={detailBlur}
            color={detailError ? "error" : "default"}
            value={detailValue}
            aria-label="Detail"
          />
          <Input
            type="number"
            label={detailError ? "Price Required *" : "Price"}
            placeholder="Enter Price"
            rounded
            bordered
            onChange={priceHandler}
            onBlur={priceBlur}
            color={priceError ? "error" : "default"}
            value={priceValue}
            aria-label="Price"
          />
          <div className="imeiAdd">
            <Input
              css={{ w: "90%" }}
              type="number"
              placeholder="Enter Code"
              rounded
              bordered
              onChange={imeiHandler}
              onBlur={imeiBlur}
              value={imeiValue}
              aria-label="Imei"
            />
            <Button
              disabled={imeiValid ? false : true}
              auto
              flat
              color="warning"
              rounded
              onClick={pushImeiHandler}
            >
              Add
            </Button>
          </div>
          <div className="addedImeis">
            {imeis.length > 0 &&
              imeis.map((doc, index) => {
                return (
                  <div key={doc} className="imeis">
                    <Text b css={{ letterSpacing: "1px" }} size="14px">
                      {doc}
                    </Text>
                    <Button
                      auto
                      size="xs"
                      flat
                      color="error"
                      onClick={() => removeImeiHandler(index)}
                    >
                      <AiFillCloseCircle />
                    </Button>
                  </div>
                );
              })}
          </div>
          <Button
            disabled={
              nameValid &&
              detailValid &&
              priceValid &&
              imeis.length > 0 &&
              category !== ""
                ? false
                : true
            }
            type="submit"
            auto
            rounded
            size="sm"
          >
            Save
          </Button>
          {!isValid && (
            <Text color="error" b size="14px" css={{ alignSelf: "center" }}>
              Please enter all fields to proceed!
            </Text>
          )}
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
