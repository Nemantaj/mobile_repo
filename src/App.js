import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import NewOrder from "./pages/NewOrder";

const dummyData = [
  {
    id: 1,
    name: "Rhody",
    date: "2021-10-16T06:40:23Z",
  },
  {
    id: 2,
    name: "Con",
    date: "2022-02-10T07:10:09Z",
  },
  {
    id: 3,
    name: "Griz",
    date: "2022-10-11T04:21:11Z",
  },
  {
    id: 4,
    name: "Leesa",
    date: "2021-10-13T14:30:18Z",
  },
  {
    id: 5,
    name: "Calhoun",
    date: "2021-12-15T10:21:05Z",
  },
  {
    id: 6,
    name: "Marco",
    date: "2022-06-11T09:37:41Z",
  },
  {
    id: 7,
    name: "Doria",
    date: "2022-09-25T15:32:25Z",
  },
  {
    id: 8,
    name: "Mariska",
    date: "2022-02-03T21:07:02Z",
  },
  {
    id: 9,
    name: "Alfie",
    date: "2021-12-21T20:52:23Z",
  },
  {
    id: 10,
    name: "Ferdy",
    date: "2022-04-17T12:59:39Z",
  },
  {
    id: 11,
    name: "Tilda",
    date: "2022-04-14T01:58:12Z",
  },
  {
    id: 12,
    name: "Heddi",
    date: "2021-12-12T08:24:16Z",
  },
  {
    id: 13,
    name: "Penrod",
    date: "2021-09-16T08:21:56Z",
  },
  {
    id: 14,
    name: "Agnella",
    date: "2022-06-26T11:48:35Z",
  },
  {
    id: 15,
    name: "Goddard",
    date: "2022-01-24T11:31:59Z",
  },
  {
    id: 16,
    name: "Jordana",
    date: "2022-05-19T12:50:35Z",
  },
  {
    id: 17,
    name: "Lizzie",
    date: "2022-08-31T07:52:17Z",
  },
  {
    id: 18,
    name: "Hagen",
    date: "2022-06-14T14:56:03Z",
  },
  {
    id: 19,
    name: "Daniela",
    date: "2021-09-20T18:05:20Z",
  },
  {
    id: 20,
    name: "Nat",
    date: "2022-06-21T09:13:26Z",
  },
  {
    id: 21,
    name: "Terese",
    date: "2022-05-06T20:42:45Z",
  },
  {
    id: 22,
    name: "Mel",
    date: "2022-07-01T18:04:11Z",
  },
  {
    id: 23,
    name: "Yurik",
    date: "2022-05-28T21:10:56Z",
  },
  {
    id: 24,
    name: "Lonnie",
    date: "2022-07-16T15:18:16Z",
  },
  {
    id: 25,
    name: "Collen",
    date: "2022-03-01T06:12:19Z",
  },
  {
    id: 26,
    name: "Giovanna",
    date: "2022-04-19T22:09:50Z",
  },
  {
    id: 27,
    name: "Jonah",
    date: "2021-11-14T11:36:06Z",
  },
  {
    id: 28,
    name: "Charis",
    date: "2022-01-02T16:16:00Z",
  },
  {
    id: 29,
    name: "Loralyn",
    date: "2022-04-05T14:21:24Z",
  },
  {
    id: 30,
    name: "Brandie",
    date: "2022-05-14T15:42:37Z",
  },
];

function App() {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState([new Date(), new Date()]);

  // Fetch all orders
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
    setAllOrders(dummyData);
    setFilteredOrders(dummyData);
  }, []);

  useEffect(() => {
    if (allOrders.length > 0) {
      let filterOrder = allOrders.filter((doc) => {
        return (
          doc.date > new Date(dateFilter[0]).toISOString &&
          doc.date < new Date(dateFilter[0]).toISOString
        );
      });
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
        <Route path="/new-order" element={<NewOrder />} />
      </Routes>
    </div>
  );
}

export default App;
