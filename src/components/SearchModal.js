import { useEffect, useState } from "react";
import { Modal, Input, Divider, Button } from "@nextui-org/react";
import SearchCard from "./SearchCard";
import { AiFillCloseCircle } from "react-icons/ai";


const SearchModal = (props) => {
  //Manage search input value
  const [inputValue, setInputValue] = useState("");
  //Manage search results (placeholder until redux is implemented!)
  const [result, setResult] = useState([]);

  //input change handler
  const onChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  //Run useEffect after waiting for 500 ms to prevent request spam
  useEffect(() => {
    if (inputValue === "") {
      return;
    }
    const timeoutId = setTimeout(() => {
      fetch(`/order/search?q=${inputValue}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Error occured while trying to fetch!");
          }
          return res.json();
        })
        .then((data) => {
          setResult(data)
        })
        .catch((err) => {
          console.log(err);
        })
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue]);

  return (
    <Modal
      open={props.visible}
      onClose={props.onClose}
      aria-label="Search"
      fullScreen
      scroll
      css={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Modal.Header css={{ p: "10px", mw: "550px", w: "100%" }}>
        <Input
          type="text"
          css={{ w: "100%" }}
          placeholder="Start searching here..."
          aria-label="Search Input"
          onChange={onChangeHandler}
          clearable
          animated={false}
          rounded
        />
        <Button auto rounded color="error" onClick={props.onClose}>
          <AiFillCloseCircle />
        </Button>
      </Modal.Header>
      <Divider />
      <Modal.Body
        css={{
          p: "10px",
          mw: "550px",
          w: "100%",
        }}
      >
        <div className="searchResult">
          {result.map((order)=>{
            return <div>
            {order.products.map(product=>{
              if(product.name.indexOf(inputValue)!=-1 || order.name.indexOf(inputValue)!=-1){
                return <div>
                {product.codes.map(code=>{
                  return <SearchCard order={order} product={product} code={code}/>
                })}
              </div>
              }
              else if(!isNaN(inputValue)){
                return <div>
                {product.codes.map(code=>{
                  if(code.indexOf(inputValue)==0){
                    return <SearchCard order={order} product={product} code={code}/>
                  }
                })}
              </div>
              }         
            })}
            </div>
          })}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SearchModal;
