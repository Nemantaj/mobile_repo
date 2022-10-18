import { Text, Card, Button } from "@nextui-org/react";
import { Fragment, useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineLineChart, AiOutlinePlus } from "react-icons/ai";
import Customer from "../components/Customer";
import DashOrder from "../components/DashOrder";

const options = [
  {
    icons: <AiOutlineLineChart className="iconAdjust" />,
    value: "All Data",
    link: "all",
  },
  {
    icons: <AiOutlinePlus className="iconAdjust" />,
    value: "New Customer",
    link: "new-customer",
  },
];

const dummyRows = [
  { _id: 1, fullName: "GUMMY NAME", city: "DUMMY_CITY" },
  { _id: 2, fullName: "DUMMY NAME", city: "CUMMY_CITY" },
  { _id: 3, fullName: "RUMMY NAME", city: "VUMMY_CITY" },
  { _id: 4, fullName: "DUMMY NAME", city: "BUMMY_CITY" },
  { _id: 5, fullName: "BUMMY NAME", city: "BUMMY_CITY" },
  { _id: 6, fullName: "SUMMY NAME", city: "NUMMY_CITY" },
  { _id: 7, fullName: "AUMMY NAME", city: "MUMMY_CITY" },
  { _id: 8, fullName: "QUMMY NAME", city: "DUMMY_CITY" },
  { _id: 9, fullName: "WUMMY NAME", city: "FUMMY_CITY" },
  { _id: 10, fullName: "EUMMY NAME", city: "GUMMY_CITY" },
];

const dummyData = [
  {
    _id: "634d3d58e5693a03f9815829",
    name: "Test",
    date: "2022-10-16T00:00:00.000+00:00",
    products: [
      {
        category: "iWatch",
        details: "Apple Watch",
        name: "Apple Watch 3",
        price: 250,
        codes: ["1234567899"],
        _id: "634d3d58e5693a03f981582a",
      },
    ],
    __v: { $numberInt: "0" },
  },
  {
    _id: "634d848378ea717daa7d81e2",
    name: "NewTest",
    date: "2022-10-17T00:00:00.000+00:00",
    products: [
      {
        category: "iPhone",
        details: "Rr",
        name: "Rr",
        price: 6500,
        codes: ["1", "2", "3", "55", "56", "77"],
        _id: "634d848378ea717daa7d81e3",
      },
    ],
    __v: { $numberInt: "0" },
  },
];

const Dashboard = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const active = location.pathname;
  const [orders, setOrders] = useState([]);

  //Order Table Sorting Logic
  const [orderList, setOrderList] = useState([]);
  const [orderListAdj, setOrderListAdj] = useState([]);
  const [orderSearch, setOrderSearch] = useState("");
  const [orderSort, setOrderSort] = useState({
    field: "date",
    asc: false,
  });
  const changeOrderSort = (field, asc) => {
    setOrderSort({ field: field, asc: asc });
  };

  //Fetch Orders
  useEffect(() => {
    // fetch("get all orders")
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error(
    //         "There was an error while retrieving data from the server."
    //       );
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //     const newData = data
    //       .map((doc) => {
    //         return doc.products.map((prod) => {
    //           return {
    //             productName: prod.name,
    //             details: prod.details,
    //             codes: prod.codes,
    //             price: prod.price,
    //             date: doc.date,
    //             _id: prod._id,
    //             category: prod.category,
    //             orderName: doc.name,
    //           };
    //         });
    //       })
    //       .flat();
    //     setOrderList(newData);
    //     setOrderListAdj(newData);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    //For testing only use the commented out code above.
    const newData = dummyData
      .map((doc) => {
        return doc.products.map((prod) => {
          return {
            productName: prod.name,
            details: prod.details,
            codes: prod.codes,
            price: prod.price,
            date: doc.date,
            _id: prod._id,
            category: prod.category,
            orderName: doc.name,
          };
        });
      })
      .flat();
    setOrderList(newData);
    setOrderListAdj(newData);
  }, []);

  //Order Table Sort Logic
  useEffect(() => {
    if (orderList.length > 0) {
      const listCopy = [...orderList];
      let sortOrder;
      if (
        orderSort.field === "orderName" ||
        orderSort.field === "productName" ||
        orderSort.field === "details"
      ) {
        sortOrder = listCopy.sort((a, b) => {
          let fa = a[orderSort.field].toLowerCase();
          let fb = b[orderSort.field].toLowerCase();
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      } else if (orderSort.field === "price") {
        sortOrder = listCopy.sort((a, b) => {
          return a[orderSort.field] - b[orderSort.field];
        });
      } else if (orderSort.field === "codes") {
        sortOrder = listCopy.sort((a, b) => {
          return a[orderSort.field].length - b[orderSort.field].length;
        });
      } else {
        sortOrder = listCopy.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });
      }
      setOrderList(sortOrder);
      setOrderListAdj(orderSort.asc ? sortOrder : sortOrder.reverse());
    }
  }, [orderSort]);

  //Order Search Logic
  useEffect(() => {
    if (orderSearch === "" && orderList.length > 0) {
      return setOrderListAdj(orderList);
    }

    if (orderList.length > 0) {
      const timeoutId = setTimeout(() => {
        const regex = new RegExp(orderSearch, "i");
        const allList = [...orderList];
        const filteredList = allList.filter((doc) => {
          return (
            regex.test(doc.orderName) ||
            regex.test(doc.productName) ||
            regex.test(doc.details)
          );
        });
        setOrderListAdj(filteredList);
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [orderSearch]);

  //Customer Table Sorting Logic
  const [customerList, setCustomerList] = useState(dummyRows);
  const [customerListAdj, setCustomerListAdj] = useState([]);
  const [customerSearch, setCustomerSearch] = useState("");
  const [customerSort, setCustomerSort] = useState({
    field: "fullName",
    asc: false,
  });
  const changeCustomerSort = (field, asc) => {
    setCustomerSort({ field: field, asc: asc });
  };
  const deleteCustomer = (id) => {
    const newFilter = customerList.filter((doc) => {
      return doc._id.toString() !== id.toString();
    });
    setCustomerList(newFilter);
    setCustomerListAdj(newFilter);
  };
  const pushToCustomer = (data) => {
    const newData = customerList.push(data);
    setCustomerList(newData);
    setCustomerListAdj(newData);
  };

  useEffect(() => {
    fetch("fetch customers list")
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "There was an error while retrieving data from the server!"
          );
        }
        return res.json();
      })
      .then((data) => {
        setCustomerList(data);
        setCustomerListAdj(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Customer Table Sort
  useEffect(() => {
    if (customerList.length > 0) {
      const listCopy = [...customerList];
      let sortCustomer;
      if (customerSort.field) {
        sortCustomer = listCopy.sort((a, b) => {
          let fa = a[customerSort.field].toLowerCase();
          let fb = b[customerSort.field].toLowerCase();
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        });
      }
      setCustomerList(customerList);
      setCustomerListAdj(
        customerSort.asc ? sortCustomer : sortCustomer.reverse()
      );
    }
  }, [customerSort]);

  //Customer Table Search
  useEffect(() => {
    if (customerSearch === "" && customerList.length > 0) {
      return setCustomerListAdj(customerList);
    }

    if (customerList.length > 0) {
      const timeoutId = setTimeout(() => {
        const regex = new RegExp(customerSearch, "i");
        const allList = [...customerList];
        const filteredList = allList.filter((doc) => {
          return regex.test(doc.fullName) || regex.test(doc.city);
        });
        setCustomerListAdj(filteredList);
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [customerSearch]);

  return (
    <Fragment>
      <div className="header">
        <Text b>DASHBOARD</Text>
      </div>
      <div className="dashDiv">
        <div className="sidebar">
          <Card variant="flat">
            <Card.Body
              css={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {options.map((doc, index) => {
                return (
                  <Text
                    className={
                      active === `/dashboard/${doc.link}`
                        ? "sidebarOption sidebarOptionActive"
                        : "sidebarOption"
                    }
                    key={index}
                    css={{
                      br: "20px",
                      py: "5px",
                      px: "10px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      navigate(`/dashboard/${doc.link}`);
                    }}
                    size="14px"
                  >
                    {doc.icons}&nbsp;
                    {doc.value}
                  </Text>
                );
              })}
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
              <Button
                rounded
                auto
                color="success"
                size="sm"
                onClick={() => navigate("/new-order")}
              >
                <AiOutlinePlus />
                &nbsp; New Order
              </Button>
            </Card.Footer>
          </Card>
        </div>
        <div className="viewDiv">
          <Routes>
            <Route
              path="/all"
              element={
                <DashOrder
                  list={orderListAdj}
                  sortFunction={changeOrderSort}
                  asc={orderSort.asc}
                  setValue={setOrderSearch}
                  value={orderSearch}
                />
              }
            />
            <Route
              path="/new-customer"
              element={
                <Customer
                  list={customerListAdj}
                  sortFunction={changeCustomerSort}
                  asc={customerSort.asc}
                  setValue={setCustomerSearch}
                  delete={deleteCustomer}
                  push={pushToCustomer}
                  value={customerSearch}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Fragment>
  );
};

export default Dashboard;
