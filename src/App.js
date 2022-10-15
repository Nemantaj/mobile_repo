import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import NewOrder from "./pages/NewOrder";

const dummyData = [
  {
    _id: 1,
    name: "Rhody",
    date: "2021-10-16T06:40:23Z",
    products: [
      {
        category: "iPhone",
        details: "taksd asd aqwe fdfe rer er e",
        name: "dasd asd s",
        price: 12,
        codes: ["12312312323", "123213123123", "12312323232"],
      },
    ],
  },
  {
    _id: 2,
    name: "Con",
    date: "2022-02-10T07:10:09Z",
    products: [
      {
        category: "iPhone",
        details: "taksd asd aqwe fdfe rer er e",
        name: "dasd asd s",
        price: 12,
        codes: ["12312312323", "123213123123", "12312323232"],
      },
    ],
  },
  {
    _id: 3,
    name: "Griz",
    date: "2022-10-11T04:21:11Z",
    products: [
      {
        category: "iPhone",
        details: "taksd asd aqwe fdfe rer er e",
        name: "dasd asd s",
        price: 12,
        codes: ["12312312323", "123213123123", "12312323232"],
      },
    ],
  },
  {
    _id: 4,
    name: "Leesa",
    date: "2021-10-13T14:30:18Z",
    products: [
      {
        category: "iPhone",
        details: "taksd asd aqwe fdfe rer er e",
        name: "dasd asd s",
        price: 12,
        codes: ["12312312323", "123213123123", "12312323232"],
      },
    ],
  },
  {
    _id: 5,
    name: "Calhoun",
    date: "2021-12-15T10:21:05Z",
    products: [
      {
        category: "iPhone",
        details: "taksd asd aqwe fdfe rer er e",
        name: "dasd asd s",
        price: 12,
        codes: ["12312312323", "123213123123", "12312323232"],
      },
    ],
  },
  {
    _id: 6,
    name: "Marco",
    date: "2022-06-11T09:37:41Z",
    products: [
      {
        category: "iPhone",
        details: "taksd asd aqwe fdfe rer er e",
        name: "dasd asd s",
        price: 12,
        codes: ["12312312323", "123213123123", "12312323232"],
      },
    ],
  },
  {
    _id: 7,
    name: "Doria",
    date: "2022-09-25T15:32:25Z",
    products: [
      {
        category: "iPhone",
        details: "taksd asd aqwe fdfe rer er e",
        name: "dasd asd s",
        price: 12,
        codes: ["12312312323", "123213123123", "12312323232"],
      },
    ],
  },
  {
    _id: 8,
    name: "Mariska",
    date: "2022-02-03T21:07:02Z",
    products: [
      {
        category: "iPhone",
        details: "taksd asd aqwe fdfe rer er e",
        name: "dasd asd s",
        price: 12,
        codes: ["12312312323", "123213123123", "12312323232"],
      },
    ],
  },
  {
    _id: 9,
    name: "Alfie",
    date: "2021-12-21T20:52:23Z",
    products: [
      {
        category: "iPhone",
        details: "taksd asd aqwe fdfe rer er e",
        name: "dasd asd s",
        price: 12,
        codes: ["12312312323", "123213123123", "12312323232"],
      },
      {
        category: "iPhone",
        details: "taksd asd aqwe fdfe rer er e",
        name: "dasd asd s",
        price: 12,
        codes: ["12312312323", "123213123123", "12312323232"],
      },
    ],
  },
];

function App() {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState([new Date(), new Date()]);
  const [updateData, setUpdateData] = useState(0);

  const triggerDataUpdate = () => {
    setUpdateData(updateData + 1);
  };

  // Fetch all orders ------------------------------------------------
  useEffect(() => {
    // setLoading(true);
    // fetch("get all order route")
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error("Error occured while trying to fetch!");
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //     setAllOrders(data);
    //     setFilteredOrders(data);
    //     return setLoading(false);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    //Temporay for testing only use upper code for backend ------------------------------
    setAllOrders(dummyData);
    setFilteredOrders(dummyData);
  }, [updateData]);

  //Sort by date -----------------------------------------------------
  useEffect(() => {
    if (allOrders.length > 0) {
      console.log(new Date(dateFilter[0]).toISOString());
      let filterOrder = allOrders.filter((doc) => {
        console.log(doc.date);
        return (
          doc.date > new Date(dateFilter[0]).toISOString() &&
          doc.date < new Date(dateFilter[1]).toISOString()
        );
      });
      console.log(filterOrder);
      setFilteredOrders(filterOrder);
    }
  }, [dateFilter]);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              value={dateFilter}
              filteredOrders={filteredOrders}
              allOrders={allOrders}
              setDateFilter={setDateFilter}
            />
          }
        />
        <Route path="/order/:orderId" element={<Orders />} />
        <Route
          path="/new-order"
          element={<NewOrder triggerUpdate={triggerDataUpdate} />}
        />
      </Routes>
    </div>
  );
}

export default App;
