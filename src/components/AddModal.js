import { useState, useRef } from "react";
import {
  Modal,
  Text,
  Input,
  Button,
  Divider,
  Textarea,
} from "@nextui-org/react";
import useInput from "../hooks/useInput";
import {
  AiFillCloseCircle,
  AiOutlinePlus,
  AiOutlineBarcode,
} from "react-icons/ai";
import Scanner from "./scanner/Scanner";

const selctValues = [
  { title: "iPhone", value: "iPhone" },
  { title: "iPad", value: "iPad" },
  { title: "iWatch", value: "iWatch" },
  { title: "AirPods", value: "Airpods" },
  { title: "Other", value: "Other" },
];

const AddModal = (props) => {
  const [imeis, setImeis] = useState([]);
  const [category, setCategory] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const [scanVisible, setScanVisible] = useState(false);
  const [results, setResults] = useState("");
  const scanCodeRef = useRef();

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
  } = useInput((value) => value !== "");

  const pushImeiHandler = () => {
    const newImei = [...imeis, imeiValue];
    setImeis(newImei);
    return clearImeis();
  };

  const onDetected = (result) => {
    // setResults(result[0].codeResults.code);
    setResults(result.codeResult.code);
  };

  const pushScanValue = (value) => {
    const newImei = [...imeis, value];
    setImeis(newImei);
    return clearImeis();
  };

  const removeImeiHandler = (index) => {
    const newImeis = [...imeis];
    let splicedImeis;
    if (newImeis.length == 1) {
      splicedImeis = [];
    } else {
      splicedImeis = newImeis.filter((doc, i) => {
        return index !== i;
      });
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

  const toggleScanner = () => {
    setResults([]);
    setScanVisible(!scanVisible);
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
        name: nameValue,
        details: detailValue,
        price: priceValue,
        codes: imeis,
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
        <Button auto size="sm" rounded color="error" onClick={closeHandler}>
          Close
        </Button>
        <Text>Add IMEI</Text>
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
          form="addForm"
        >
          Save
        </Button>
      </Modal.Header>
      <Divider />
      <Modal.Body css={{ w: "100%", mw: "550px" }}>
        <form className="imeiForm" onSubmit={submitHandler} id="addForm">
          <div className="selectCustom">
            <select
              id="select"
              onChange={(event) => setCategory(event.target.value)}
              aria-label="Select Category"
              defaultValue={""}
            >
              <option disabled value="">
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
              bordered
              onChange={imeiHandler}
              onBlur={imeiBlur}
              value={imeiValue}
              aria-label="Imei"
            />
            <Button auto flat color="warning" rounded onClick={toggleScanner}>
              <AiOutlineBarcode />
            </Button>
            <Button
              disabled={imeiValid ? false : true}
              auto
              flat
              color="warning"
              rounded
              onClick={pushImeiHandler}
            >
              <AiOutlinePlus />
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
          {scanVisible && (
            <div>
              <div className="scanActions">
                <Input
                  aria-label="Scan Result"
                  type="text"
                  value={results}
                  bordered
                  ref={scanCodeRef}
                  css={{ w: "90%" }}
                />
                <Button
                  color="warning"
                  flat
                  rounded
                  auto
                  disabled={results[0] ? false : true}
                  onClick={() => pushScanValue(scanCodeRef.current.value)}
                >
                  <AiOutlinePlus />
                </Button>
              </div>
              <div className="scanner">
                <Scanner onDetected={onDetected} />
              </div>
            </div>
          )}
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
