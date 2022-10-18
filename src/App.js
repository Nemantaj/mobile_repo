import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import NewOrder from "./pages/NewOrder";
import Dashboard from "./pages/Dashboard";

function App() {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dateFilter, setDateFilter] = useState([new Date(), new Date()]);
  const [updateData, setUpdateData] = useState(0);

  const triggerDataUpdate = () => {
    setUpdateData(updateData + 1);
  };

  // Fetch all orders
  useEffect(() => {
    setLoading(true);
    fetch("/orders")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error occured while trying to fetch!");
        }
        return res.json();
      })
      .then((data) => {
        setAllOrders(data);
        setFilteredOrders(data);
        return setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [updateData]);

  useEffect(() => {
    if (dateFilter === null) {
      return setFilteredOrders(allOrders);
    }
    if (dateFilter !== null && allOrders.length > 0) {
      let filterOrder = allOrders.filter((doc) => {
        return (
          doc.date > new Date(dateFilter[0]).toISOString() &&
          doc.date < new Date(dateFilter[1]).toISOString()
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
              loading={loading}
              value={dateFilter}
              filteredOrders={filteredOrders}
              allOrders={allOrders}
              setDateFilter={setDateFilter}
            />
          }
        />
        <Route path="/order/:id" element={<Orders />} />
        <Route
          path="/new-order"
          element={<NewOrder triggerUpdate={triggerDataUpdate} />}
        />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
