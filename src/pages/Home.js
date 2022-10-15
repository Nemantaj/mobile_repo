import { useState } from "react";
import { Text, Button } from "@nextui-org/react";
import { Fragment } from "react";
import OrderCard from "../components/OrderCard";
import SearchModal from "../components/SearchModal";
import { AiOutlineSearch, AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";

import "./Home.css";

const Home = (props) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Fragment>
      <div className="header">
        <Text>MARVAN</Text>
        <DateRangePicker onChange={props.setDateFilter} value={props.value} />
      </div>
      <div className="orderDiv">
        {props.filteredOrders.length > 0 &&
          props.filteredOrders.map((doc, index) => {
            return (
              <OrderCard
                key={index}
                name={doc.name}
                date={doc.date}
                products={doc.products}
              />
            );
          })}
      </div>
      <div className="actionContainer">
        <div className="actionDiv">
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
      <SearchModal visible={isVisible} onClose={() => setIsVisible(false)} />
    </Fragment>
  );
};

export default Home;
