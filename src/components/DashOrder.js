import OrderTable from "./OrderTable";

const DashOrder = (props) => {
  return (
    <div className="customerDiv">
      <OrderTable
        list={props.list}
        asc={props.asc}
        sortFunction={props.sortFunction}
        setValue={props.setValue}
        value={props.value}
      />
    </div>
  );
};

export default DashOrder;
