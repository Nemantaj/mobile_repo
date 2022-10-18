import { Table, Card, Text, Button, Input } from "@nextui-org/react";
import { useState } from "react";
import {
  AiFillPrinter,
  AiOutlineSearch,
  AiOutlineOrderedList,
  AiOutlineSortAscending,
} from "react-icons/ai";

const columns = [
  { key: "date", label: "Date" },
  { key: "orderName", label: "Name" },
  { key: "productName", label: "Product" },
  { key: "details", label: "Details" },
  { key: "price", label: "Price" },
  { key: "codes", label: "Tokens" },
  { key: "pdf", label: "" },
];

const dummyRows = [
  {
    id: 1,
    date: "5/5/2022",
    name: "Theresa",
    productName: "Richardot",
    details: "Regrant",
    price: 33,
    token: 17,
  },
  {
    id: 2,
    date: "4/9/2022",
    name: "Drake",
    productName: "Rawood",
    details: "Flexidy",
    price: 68,
    token: 5,
  },
  {
    id: 3,
    date: "7/8/2022",
    name: "Erika",
    productName: "Heiden",
    details: "Duobam",
    price: 68,
    token: 87,
  },
  {
    id: 4,
    date: "9/13/2022",
    name: "Ellerey",
    productName: "Reinmar",
    details: "Cardify",
    price: 61,
    token: 79,
  },
  {
    id: 5,
    date: "9/17/2022",
    name: "Monika",
    productName: "Visco",
    details: "Overhold",
    price: 21,
    token: 3,
  },
  {
    id: 6,
    date: "3/29/2022",
    name: "Mirilla",
    productName: "Duffell",
    details: "Alphazap",
    price: 93,
    token: 91,
  },
  {
    id: 7,
    date: "6/11/2022",
    name: "Linnet",
    productName: "Leile",
    details: "Tres-Zap",
    price: 9,
    token: 54,
  },
  {
    id: 8,
    date: "12/21/2021",
    name: "Margaretta",
    productName: "Scarsbrook",
    details: "Daltfresh",
    price: 19,
    token: 54,
  },
  {
    id: 9,
    date: "11/5/2021",
    name: "Shelagh",
    productName: "Riquet",
    details: "Daltfresh",
    price: 72,
    token: 58,
  },
  {
    id: 10,
    date: "11/29/2021",
    name: "Moira",
    productName: "Lornsen",
    details: "Sonsing",
    price: 30,
    token: 9,
  },
  {
    id: 11,
    date: "2/12/2022",
    name: "Tania",
    productName: "Grigolon",
    details: "Veribet",
    price: 9,
    token: 63,
  },
  {
    id: 12,
    date: "2/19/2022",
    name: "Wilt",
    productName: "Sherrett",
    details: "Subin",
    price: 42,
    token: 39,
  },
  {
    id: 13,
    date: "3/28/2022",
    name: "Durante",
    productName: "Wickins",
    details: "Keylex",
    price: 16,
    token: 43,
  },
  {
    id: 14,
    date: "11/21/2021",
    name: "Cathryn",
    productName: "Meijer",
    details: "Namfix",
    price: 10,
    token: 58,
  },
  {
    id: 15,
    date: "4/5/2022",
    name: "Cornie",
    productName: "Cases",
    details: "Bamity",
    price: 40,
    token: 43,
  },
  {
    id: 16,
    date: "11/27/2021",
    name: "Lynette",
    productName: "Colchett",
    details: "Home Ing",
    price: 93,
    token: 99,
  },
  {
    id: 17,
    date: "2/1/2022",
    name: "Chas",
    productName: "Garbutt",
    details: "Zaam-Dox",
    price: 57,
    token: 64,
  },
  {
    id: 18,
    date: "6/15/2022",
    name: "Ethelred",
    productName: "Simester",
    details: "Alphazap",
    price: 60,
    token: 29,
  },
  {
    id: 19,
    date: "6/12/2022",
    name: "Atlante",
    productName: "Backshill",
    details: "Lotstring",
    price: 10,
    token: 9,
  },
  {
    id: 20,
    date: "2/25/2022",
    name: "Nancee",
    productName: "Collison",
    details: "Otcom",
    price: 72,
    token: 10,
  },
  {
    id: 21,
    date: "1/10/2022",
    name: "Piggy",
    productName: "Capsey",
    details: "Regrant",
    price: 34,
    token: 90,
  },
  {
    id: 22,
    date: "9/6/2022",
    name: "Ruprecht",
    productName: "Maker",
    details: "Tin",
    price: 85,
    token: 41,
  },
  {
    id: 23,
    date: "9/5/2022",
    name: "Wallace",
    productName: "Twelves",
    details: "Toughjoyfax",
    price: 99,
    token: 5,
  },
  {
    id: 24,
    date: "5/29/2022",
    name: "Dex",
    productName: "Newens",
    details: "Mat Lam Tam",
    price: 30,
    token: 57,
  },
  {
    id: 25,
    date: "5/2/2022",
    name: "Connie",
    productName: "Mabbott",
    details: "Domainer",
    price: 89,
    token: 68,
  },
  {
    id: 26,
    date: "3/21/2022",
    name: "Benito",
    productName: "Everson",
    details: "Ventosanzap",
    price: 78,
    token: 48,
  },
  {
    id: 27,
    date: "6/7/2022",
    name: "Maje",
    productName: "Ralling",
    details: "Domainer",
    price: 63,
    token: 24,
  },
  {
    id: 28,
    date: "7/5/2022",
    name: "Ignatius",
    productName: "Stinton",
    details: "Cookley",
    price: 61,
    token: 41,
  },
  {
    id: 29,
    date: "3/4/2022",
    name: "Breanne",
    productName: "Wilfinger",
    details: "Alphazap",
    price: 89,
    token: 84,
  },
  {
    id: 30,
    date: "11/23/2021",
    name: "Dermot",
    productName: "Cuer",
    details: "Greenlam",
    price: 27,
    token: 93,
  },
  {
    id: 31,
    date: "12/26/2021",
    name: "Blondell",
    productName: "Kidd",
    details: "Prodder",
    price: 9,
    token: 36,
  },
  {
    id: 32,
    date: "9/7/2022",
    name: "Caleb",
    productName: "Harrower",
    details: "Sonair",
    price: 35,
    token: 93,
  },
  {
    id: 33,
    date: "10/19/2021",
    name: "Emile",
    productName: "Chaff",
    details: "Fintone",
    price: 65,
    token: 73,
  },
  {
    id: 34,
    date: "6/4/2022",
    name: "Irvine",
    productName: "Beckwith",
    details: "Y-find",
    price: 39,
    token: 41,
  },
  {
    id: 35,
    date: "8/4/2022",
    name: "Claybourne",
    productName: "Warbeys",
    details: "Stringtough",
    price: 4,
    token: 72,
  },
  {
    id: 36,
    date: "12/22/2021",
    name: "Barbey",
    productName: "Negal",
    details: "Stim",
    price: 40,
    token: 29,
  },
  {
    id: 37,
    date: "2/14/2022",
    name: "Cathleen",
    productName: "Jopson",
    details: "Duobam",
    price: 84,
    token: 58,
  },
  {
    id: 38,
    date: "7/1/2022",
    name: "Stanislaw",
    productName: "Gidley",
    details: "Wrapsafe",
    price: 46,
    token: 88,
  },
  {
    id: 39,
    date: "10/10/2022",
    name: "Bobine",
    productName: "Warbey",
    details: "Bigtax",
    price: 9,
    token: 40,
  },
  {
    id: 40,
    date: "10/9/2022",
    name: "Harley",
    productName: "McMillam",
    details: "Gembucket",
    price: 71,
    token: 76,
  },
  {
    id: 41,
    date: "4/20/2022",
    name: "Kayla",
    productName: "Bengtson",
    details: "Lotstring",
    price: 23,
    token: 38,
  },
  {
    id: 42,
    date: "5/1/2022",
    name: "Ira",
    productName: "Hendrick",
    details: "Wrapsafe",
    price: 82,
    token: 68,
  },
  {
    id: 43,
    date: "4/30/2022",
    name: "Nicholle",
    productName: "McGowan",
    details: "Voyatouch",
    price: 39,
    token: 7,
  },
  {
    id: 44,
    date: "10/31/2021",
    name: "Maritsa",
    productName: "Delacourt",
    details: "Zamit",
    price: 45,
    token: 94,
  },
  {
    id: 45,
    date: "3/25/2022",
    name: "Putnam",
    productName: "Dood",
    details: "Redhold",
    price: 2,
    token: 92,
  },
  {
    id: 46,
    date: "11/11/2021",
    name: "Jeniece",
    productName: "Benezet",
    details: "Bytecard",
    price: 64,
    token: 11,
  },
  {
    id: 47,
    date: "9/28/2022",
    name: "Hertha",
    productName: "Leander",
    details: "Matsoft",
    price: 89,
    token: 89,
  },
  {
    id: 48,
    date: "6/9/2022",
    name: "Leonidas",
    productName: "Baptiste",
    details: "Otcom",
    price: 33,
    token: 50,
  },
  {
    id: 49,
    date: "12/30/2021",
    name: "Dorey",
    productName: "Cutchee",
    details: "Flexidy",
    price: 40,
    token: 68,
  },
  {
    id: 50,
    date: "3/25/2022",
    name: "Jinny",
    productName: "Romanelli",
    details: "Cardguard",
    price: 40,
    token: 100,
  },
  {
    id: 51,
    date: "11/24/2021",
    name: "Bay",
    productName: "Greenstreet",
    details: "Holdlamis",
    price: 80,
    token: 25,
  },
  {
    id: 52,
    date: "11/3/2021",
    name: "Onfre",
    productName: "Van den Velde",
    details: "Y-Solowarm",
    price: 61,
    token: 73,
  },
  {
    id: 53,
    date: "5/8/2022",
    name: "Jareb",
    productName: "Zoanetti",
    details: "Tin",
    price: 53,
    token: 75,
  },
  {
    id: 54,
    date: "11/28/2021",
    name: "Nadean",
    productName: "Portam",
    details: "Domainer",
    price: 22,
    token: 48,
  },
  {
    id: 55,
    date: "6/22/2022",
    name: "Peirce",
    productName: "Pymm",
    details: "Zathin",
    price: 27,
    token: 70,
  },
  {
    id: 56,
    date: "8/29/2022",
    name: "Dulcinea",
    productName: "Skipworth",
    details: "Kanlam",
    price: 28,
    token: 38,
  },
  {
    id: 57,
    date: "1/14/2022",
    name: "Norby",
    productName: "Rapson",
    details: "Cookley",
    price: 97,
    token: 33,
  },
  {
    id: 58,
    date: "8/7/2022",
    name: "Myles",
    productName: "Ginley",
    details: "Quo Lux",
    price: 77,
    token: 9,
  },
  {
    id: 59,
    date: "4/4/2022",
    name: "Bette",
    productName: "Padula",
    details: "Temp",
    price: 93,
    token: 1,
  },
  {
    id: 60,
    date: "12/31/2021",
    name: "Norris",
    productName: "Elwood",
    details: "Lotlux",
    price: 72,
    token: 15,
  },
  {
    id: 61,
    date: "4/21/2022",
    name: "Selestina",
    productName: "Micallef",
    details: "Tampflex",
    price: 73,
    token: 87,
  },
  {
    id: 62,
    date: "2/12/2022",
    name: "Lari",
    productName: "Scandroot",
    details: "Otcom",
    price: 95,
    token: 32,
  },
  {
    id: 63,
    date: "8/30/2022",
    name: "Nicol",
    productName: "Mushrow",
    details: "Hatity",
    price: 27,
    token: 20,
  },
  {
    id: 64,
    date: "5/9/2022",
    name: "Araldo",
    productName: "Joskowicz",
    details: "Otcom",
    price: 66,
    token: 46,
  },
  {
    id: 65,
    date: "9/22/2022",
    name: "Claudetta",
    productName: "Mathewson",
    details: "Fintone",
    price: 46,
    token: 76,
  },
  {
    id: 66,
    date: "7/23/2022",
    name: "Alvera",
    productName: "Vogeller",
    details: "Ronstring",
    price: 71,
    token: 30,
  },
  {
    id: 67,
    date: "12/23/2021",
    name: "Dido",
    productName: "Firsby",
    details: "Keylex",
    price: 58,
    token: 58,
  },
  {
    id: 68,
    date: "9/26/2022",
    name: "Vale",
    productName: "Dan",
    details: "Matsoft",
    price: 94,
    token: 45,
  },
  {
    id: 69,
    date: "4/2/2022",
    name: "Darb",
    productName: "Donnell",
    details: "Latlux",
    price: 85,
    token: 76,
  },
  {
    id: 70,
    date: "3/21/2022",
    name: "Elinore",
    productName: "Bridgman",
    details: "Biodex",
    price: 8,
    token: 63,
  },
  {
    id: 71,
    date: "5/13/2022",
    name: "Dorothea",
    productName: "Diem",
    details: "Flexidy",
    price: 88,
    token: 10,
  },
  {
    id: 72,
    date: "4/8/2022",
    name: "Alberta",
    productName: "Chave",
    details: "Ronstring",
    price: 14,
    token: 95,
  },
  {
    id: 73,
    date: "3/23/2022",
    name: "Irena",
    productName: "Crocumbe",
    details: "Latlux",
    price: 54,
    token: 82,
  },
  {
    id: 74,
    date: "2/23/2022",
    name: "Laverna",
    productName: "Blastock",
    details: "Prodder",
    price: 76,
    token: 13,
  },
  {
    id: 75,
    date: "10/16/2022",
    name: "Malinda",
    productName: "Gauld",
    details: "Andalax",
    price: 25,
    token: 30,
  },
  {
    id: 76,
    date: "4/28/2022",
    name: "Ephraim",
    productName: "Lisett",
    details: "Bigtax",
    price: 29,
    token: 10,
  },
  {
    id: 77,
    date: "8/9/2022",
    name: "Wilma",
    productName: "Rous",
    details: "Lotstring",
    price: 68,
    token: 17,
  },
  {
    id: 78,
    date: "12/19/2021",
    name: "Bambi",
    productName: "Urch",
    details: "Stim",
    price: 57,
    token: 86,
  },
  {
    id: 79,
    date: "12/18/2021",
    name: "Prince",
    productName: "Liddon",
    details: "Bigtax",
    price: 42,
    token: 31,
  },
  {
    id: 80,
    date: "8/18/2022",
    name: "Greggory",
    productName: "Humblestone",
    details: "Zoolab",
    price: 50,
    token: 80,
  },
  {
    id: 81,
    date: "4/1/2022",
    name: "Cale",
    productName: "Gratrex",
    details: "Alphazap",
    price: 22,
    token: 68,
  },
  {
    id: 82,
    date: "3/19/2022",
    name: "Rab",
    productName: "Strewthers",
    details: "Hatity",
    price: 44,
    token: 44,
  },
  {
    id: 83,
    date: "5/1/2022",
    name: "Randy",
    productName: "Gargett",
    details: "Overhold",
    price: 66,
    token: 30,
  },
  {
    id: 84,
    date: "10/13/2022",
    name: "Mauricio",
    productName: "Rich",
    details: "Bytecard",
    price: 98,
    token: 45,
  },
  {
    id: 85,
    date: "8/14/2022",
    name: "Cameron",
    productName: "Timbrell",
    details: "Biodex",
    price: 5,
    token: 76,
  },
  {
    id: 86,
    date: "7/4/2022",
    name: "Mella",
    productName: "Kembry",
    details: "Gembucket",
    price: 62,
    token: 55,
  },
  {
    id: 87,
    date: "2/24/2022",
    name: "Ilise",
    productName: "Houlridge",
    details: "Keylex",
    price: 73,
    token: 14,
  },
  {
    id: 88,
    date: "11/9/2021",
    name: "Anthiathia",
    productName: "Tollit",
    details: "Y-find",
    price: 33,
    token: 52,
  },
  {
    id: 89,
    date: "1/21/2022",
    name: "Emery",
    productName: "Plumer",
    details: "Matsoft",
    price: 86,
    token: 65,
  },
  {
    id: 90,
    date: "7/8/2022",
    name: "Aksel",
    productName: "Stirling",
    details: "Quo Lux",
    price: 46,
    token: 18,
  },
  {
    id: 91,
    date: "1/11/2022",
    name: "Parke",
    productName: "Cabell",
    details: "Tres-Zap",
    price: 8,
    token: 21,
  },
  {
    id: 92,
    date: "12/4/2021",
    name: "Ingaborg",
    productName: "Thebeau",
    details: "Alphazap",
    price: 99,
    token: 61,
  },
  {
    id: 93,
    date: "12/29/2021",
    name: "Harley",
    productName: "Spacie",
    details: "Ventosanzap",
    price: 19,
    token: 64,
  },
  {
    id: 94,
    date: "4/1/2022",
    name: "Dedie",
    productName: "Brogi",
    details: "Aerified",
    price: 32,
    token: 64,
  },
  {
    id: 95,
    date: "1/9/2022",
    name: "Vance",
    productName: "Barwick",
    details: "Voltsillam",
    price: 16,
    token: 59,
  },
  {
    id: 96,
    date: "3/2/2022",
    name: "Salim",
    productName: "Aers",
    details: "Viva",
    price: 53,
    token: 84,
  },
  {
    id: 97,
    date: "9/20/2022",
    name: "Essa",
    productName: "Macbane",
    details: "Vagram",
    price: 22,
    token: 42,
  },
  {
    id: 98,
    date: "2/23/2022",
    name: "Fabien",
    productName: "Moth",
    details: "Redhold",
    price: 45,
    token: 46,
  },
  {
    id: 99,
    date: "11/21/2021",
    name: "Francyne",
    productName: "Lillyman",
    details: "Opela",
    price: 55,
    token: 9,
  },
  {
    id: 100,
    date: "12/22/2021",
    name: "Dominga",
    productName: "Marcinkus",
    details: "Stringtough",
    price: 41,
    token: 40,
  },
];

const OrderTable = (props) => {
  const [row, setRow] = useState(7);

  //Download Product PDF
  const downloadPDf = (id) => {
    fetch("make get request with id")
      .then((res) => {
        if (!res.ok) {
          throw new Error(
            "There was an error while sending request to server!"
          );
        }
        res.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "contact-" + id + ".pdf");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Download All shown Products PDFs
  const filteredPdfDownload = () => {
    if (props.list.length > 0) {
      const productIds = props.list.map((doc) => {
        return doc._id;
      });

      fetch(`make post request with all currently filtered product Ids`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productIds,
        }),
      })
        .then((res) => res.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "contact-All.pdf");
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Card variant="bordered" className="cardShadow">
      <Card.Header
        css={{ display: "inline-flex", justifyContent: "space-between" }}
      >
        <div className="orderTableActions">
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
          <Button size="sm" color="success" auto rounded>
            <AiFillPrinter />
            &nbsp;PDF
          </Button>
        </div>
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
                    {column.key !== "pdf" && (
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
            {props.list.map((doc) => {
              return (
                <Table.Row key={doc._id} css={{ fontSize: "14px" }}>
                  <Table.Cell>{doc.date.slice(0, 10)}</Table.Cell>
                  <Table.Cell>{doc.orderName}</Table.Cell>
                  <Table.Cell>{doc.productName}</Table.Cell>
                  <Table.Cell>{doc.details}</Table.Cell>
                  <Table.Cell>{doc.price}</Table.Cell>
                  <Table.Cell>{doc.codes.length}</Table.Cell>
                  <Table.Cell>
                    <Button size="xs" rounded color="error" auto flat>
                      <AiFillPrinter />
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

export default OrderTable;
