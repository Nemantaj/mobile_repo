import { Table, Card, Text, Button, Input } from "@nextui-org/react";
import { useState, useEffect } from "react";
import {
  AiFillDelete,
  AiOutlineSearch,
  AiOutlineOrderedList,
  AiOutlineSortAscending,
} from "react-icons/ai";

const columns = [
  { key: "fullName", label: "Name" },
  { key: "city", label: "City" },
  { key: "delete", label: "" },
];

const CustomerTable = (props) => {
  const [row, setRow] = useState(7);

  const deleteRecord = (id) => {
    fetch()
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "An error occured while trying to delete this record!"
          );
        }
        return props.delete(id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card variant="bordered" className="cardShadow">
      <Card.Header
        css={{ display: "inline-flex", justifyContent: "space-between" }}
      >
        <Input
          aria-label="Set Row"
          contentLeft={<AiOutlineOrderedList />}
          type="number"
          bordered
          css={{ w: "100px" }}
          size="sm"
          value={row}
          onChange={(event) => setRow(event.target.value)}
        />
        <Input
          aria-label="Search"
          contentLeft={<AiOutlineSearch />}
          type="text"
          placeholder="Search..."
          bordered
          size="sm"
          value={props.value}
          onChange={(event) => props.setValue(event.target.value)}
        />
      </Card.Header>
      <Card.Divider />
      <Card.Body css={{ p: 0 }}>
        <Table aria-label="Customers List" compact sticked shadow={false}>
          <Table.Header>
            {columns.map((column) => {
              return (
                <Table.Column key={column.key} css={{ color: "black" }}>
                  <div className="tableColumn">
                    {column.label}&nbsp;&nbsp;&nbsp;
                    {column.key !== "delete" && (
                      <Button
                        flat
                        auto
                        size="xs"
                        rounded
                        onClick={() =>
                          props.sortFunction(column.key, !props.asc)
                        }
                      >
                        <AiOutlineSortAscending />
                      </Button>
                    )}
                  </div>
                </Table.Column>
              );
            })}
          </Table.Header>
          <Table.Body css={{ textAlign: "start" }}>
            {props.list.map((item) => {
              return (
                <Table.Row key={item._id} css={{ fontSize: "14px" }}>
                  <Table.Cell>{item.fullName}</Table.Cell>
                  <Table.Cell>{item.city}</Table.Cell>
                  <Table.Cell>
                    <Button
                      size="xs"
                      rounded
                      color="error"
                      auto
                      flat
                      onClick={() => deleteRecord(item._id)}
                    >
                      <AiFillDelete />
                    </Button>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
          <Table.Pagination
            size="sm"
            color="error"
            shadow
            align="center"
            rowsPerPage={row}
          />
        </Table>
      </Card.Body>
    </Card>
  );
};

export default CustomerTable;
