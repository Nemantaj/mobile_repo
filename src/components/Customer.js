import CustomerTable from "./CustomerTable";
import NewCustomer from "./NewCustomer";

const Customer = (props) => {
  return (
    <div className="customerDiv">
      <div className="newCustomer">
        <NewCustomer push={props.push} />
      </div>
      <div className="customerTable">
        <CustomerTable
          list={props.list}
          asc={props.asc}
          sortFunction={props.sortFunction}
          setValue={props.setValue}
          delete={props.delete}
          value={props.value}
        />
      </div>
    </div>
  );
};

export default Customer;
