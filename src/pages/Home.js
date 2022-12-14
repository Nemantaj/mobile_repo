import { useState } from "react";
import { Text, Button, Loading } from "@nextui-org/react";
import { Fragment } from "react";
import OrderCard from "../components/OrderCard";
import SearchModal from "../components/SearchModal";
import {
  AiOutlineSearch,
  AiOutlinePlus,
  AiOutlineLayout,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

import "./Home.css";

const Home = (props) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Fragment>
      <div className="header">
        <Text b>HOME</Text>
        <DateRangePicker onChange={props.setDateFilter} value={props.value} />
      </div>
      {props.loading ? (
        <div className="orderDiv">
          <Loading type="spinner" />
        </div>
      ) : (
        <div className="orderDiv">
          {props.filteredOrders.length > 0 &&
            props.filteredOrders.map((doc, index) => {
              return (
                <OrderCard
                  key={index}
                  name={doc.name}
                  date={doc.date.slice(0, 10)}
                  products={doc.products}
                  id={doc._id}
                />
              );
            })}
        </div>
      )}
      <div className="actionContainer">
        <div className="actionDiv">
          <Button
            size="sm"
            css={{ w: "50px", h: "50px" }}
            auto
            color="error"
            rounded
            onClick={() => navigate("/dashboard/all")}
            className="cardShadow"
            icon={<AiOutlineLayout />}
          />
          <Button
            size="sm"
            css={{ w: "50px", h: "50px" }}
            auto
            rounded
            onClick={() => setIsVisible(!isVisible)}
            className="cardShadow"
            icon={<AiOutlineSearch />}
          />
          <Button
            size="sm"
            css={{ w: "50px", h: "50px" }}
            auto
            rounded
            color="success"
            className="cardShadow"
            icon={<AiOutlinePlus />}
            onClick={() => navigate("/new-order")}
          />
        </div>
      </div>
      <SearchModal
        visible={isVisible}
        orders={props.allOrders}
        onClose={() => setIsVisible(false)}
      />
    </Fragment>
  );
};

export default Home;
