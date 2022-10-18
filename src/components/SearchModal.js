import { useEffect, useState } from "react";
import { Modal, Input, Divider, Button, Text } from "@nextui-org/react";
import SearchCard from "./SearchCard";
import { AiFillCloseCircle } from "react-icons/ai";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

const SearchModal = (props) => {
  //Manage search input value
  const [inputValue, setInputValue] = useState("");
  //Manage search results (placeholder until redux is implemented!)
  const [allData, setAllData] = useState([]);
  const [result, setResult] = useState([]);
  const [currentFilter, setCurrentFilter] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState(null);
  const [error, setError] = useState(false);

  //input change handler
  const onChangeHandler = (event) => {
    setInputValue(event.target.value);
    console.log(event.target.value);
  };

  //useEffect fetchAll
  useEffect(() => {
    setError(false);
    setLoading(true);
    fetch("/orders")
      .then((res) => {
        if (!res.ok) {
          setError(true);
        }
        return res.json();
      })
      .then((data) => {
        setAllData(data);
        setResult(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  //Run useEffect after waiting for 500 ms to prevent request spam
  useEffect(() => {
    if (inputValue === "") {
      setResult(allData);
    }
    const timeoutId = setTimeout(() => {
      const allCopy = [...allData];
      const filteredArray = allCopy.filter((doc) => {
        return (
          doc.name.includes(inputValue) ||
          doc.products.filter(
            (subDoc) =>
              subDoc.name.includes(inputValue) ||
              subDoc.codes.includes(inputValue)
          )
        );
      });
      setCurrentFilter(filteredArray);
      setResult(filteredArray);
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputValue]);

  useEffect(() => {
    if (dateFilter === null) {
      setCurrentFilter(allData);
      setResult(allData);
    }
    console.log(dateFilter);
    if (dateFilter !== null && result.length > 0) {
      let filterOrder = currentFilter.filter((doc) => {
        return (
          doc.date > new Date(dateFilter[0]).toISOString() &&
          doc.date < new Date(dateFilter[1]).toISOString()
        );
      });
      setResult(filterOrder);
    }
  }, [dateFilter, currentFilter]);

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
      <Modal.Header
        css={{
          p: "10px",
          mw: "550px",
          w: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="searchActions">
          <Input
            type="text"
            css={{ w: "100%", mr: "5px" }}
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
        </div>
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
          <div className="dateFilter">
            <DateRangePicker value={dateFilter} onChange={setDateFilter} />
          </div>
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
          {result.map((order, index) => {
            return (
              <div key={index}>
                {order.products.map((product, index) => {
                  if (
                    product.name.indexOf(inputValue) != -1 ||
                    order.name.indexOf(inputValue) != -1
                  ) {
                    return (
                      <div key={index}>
                        {product.codes.map((code, index) => {
                          return (
                            <SearchCard
                              id={order._id}
                              key={index}
                              order={order}
                              product={product}
                              code={code}
                            />
                          );
                        })}
                      </div>
                    );
                  } else if (!isNaN(inputValue)) {
                    return (
                      <div key={index}>
                        {product.codes.map((code, index) => {
                          if (code.indexOf(inputValue) == 0) {
                            return (
                              <SearchCard
                                id={order._id}
                                key={index}
                                order={order}
                                product={product}
                                code={code}
                              />
                            );
                          }
                        })}
                      </div>
                    );
                  }
                })}
              </div>
            );
          })}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SearchModal;
