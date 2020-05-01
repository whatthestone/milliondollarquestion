import React, { useState, useEffect } from "react";
import {
  Button,
  ListGroup,
  Image,
  Nav,
  Tab,
  Row,
  Col,
  Badge,
} from "react-bootstrap";
import styled from "styled-components";
import PantryAddModal from "../components/PantryAddModal";
import moment from "moment";

const StyledItem = styled(ListGroup.Item)`
  display: flex;
  flexdirection: row;
  justify-content: space-between;
  padding: 0.5rem;
  height: "auto";
`;

const StyledButton = styled(Button)`
  margin-left: 1rem;
`;

const StyledRemoveButton = styled(Button)`
  transform: translateX(0.5rem);
  transition: opacity 0.2s, transform 0.2s;
  opacity: ${(props) => (props.showdelete ? 1 : 0)};
  transform: ${(props) =>
    props.showdelete ? "translateX(0)" : "translateX(.5rem)"};
`;

const StyledCol = styled(Col)`
  @media only screen and (max-width: 575px) {
    margin-top: 1rem;
  }
`;

const StyledCatPill = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  padding: 0.2rem 0.5rem 0.2rem 0.5rem;
  margin: 0.2rem;
  background-color: ${(props) => props.categories[props.c]};
  border-radius: 0.5rem;
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
  }
`;

const StyledBadge = styled(Badge)`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  top: -0.4rem;
  right: -0.4rem;
  transform: ${(props) => (props.c === props.cat ? "scale(1)" : "scale(0)")};
  transition: transform 0.2s;
`;

export default function Profile() {
  const [pantry, setPantry] = useState(
    JSON.parse(localStorage.getItem("pantry")) || [
      {
        name: "rice",
        expiry: "1587513600",
        location: "dry pantry",
        cat: "grains",
      },
      {
        name: "egg",
        expiry: "1588204800",
        location: "dry pantry",
        cat: "dairy & soy",
      },
      { name: "ham", expiry: "1588377600", location: "fridge", cat: "meat" },
      {
        name: "ice cream",
        expiry: "1588742721",
        location: "freezer",
        cat: "frozen",
      },
      {
        name: "cheese",
        expiry: "1588742721",
        location: "fridge",
        cat: "dairy & soy",
      },
      { name: "bacon", expiry: "1588742721", location: "fridge", cat: "meat" },
      {
        name: "celery",
        expiry: "1588742721",
        location: "fridge",
        cat: "vegetables",
      },
      {
        name: "carrots",
        expiry: "1588118400",
        location: "fridge",
        cat: "vegetables",
      },
    ]
  );

  const categories = {
    all: "#3f72af",
    fruits: "#ff6f3c",
    vegetables: "#1fab89",
    meat: "#e84a5f",
    "dairy & soy": "#52616b",
    bread: "#d4a5a5",
    grains: "#a2d5f2",
    "sauce & condiments": "#b83b5e",
    frozen: "#6a2c70",
    other: "#fcbad3",
  };

  const [showEdit, setShowEdit] = useState(false);
  const [showdelete, setShowdelete] = useState(false);
  const [filter, setFilter] = useState("all");
  const [cat, setCat] = useState("all");

  useEffect(() => {
    localStorage.setItem("pantry", JSON.stringify(pantry));
  }, [pantry]);

  const handleAddItem = ({ itemName, expiry, location, cat }) => {
    const newPantry = [...pantry, { name: itemName, expiry, location, cat }];
    setPantry(newPantry);
  };

  const filterPantry = pantry.filter((item) =>
    filter === "all" && cat === "all"
      ? item
      : filter === "all"
      ? cat === item.cat
      : cat === "all"
      ? filter === item.location
      : (filter === item.location) & (cat === item.cat)
  );

  //filter pantry list based on location
  const pantryList = (
    <ListGroup>
      {filterPantry.map((item, key) => (
        <StyledItem key={key}>
          <div style={{ display: "flex" }}>
            <Image
              style={{ height: "3em", width: "3rem" }}
              src={`https://spoonacular.com/cdn/ingredients_100x100/${item.name.toLowerCase()}.jpg`}
            />
            <div
              style={{
                display: "flex",
                marginLeft: ".5rem",
                marginRight: ".5rem",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <span style={{ fontWeight: "bold" }}>{item.name}</span>
              <span
                style={{
                  color: moment.unix(item.expiry).isBefore()
                    ? "red"
                    : moment.unix(item.expiry).isBefore(moment().add(2, "days"))
                    ? "#f90"
                    : "grey",
                  fontWeight: "600",
                }}
              >
                {moment.unix(item.expiry).calendar()}
              </span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  color: "grey",
                  fontWeight: "600",
                  textAlign: "right",
                }}
              >
                {item.location}
              </span>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <StyledRemoveButton
                  size="sm"
                  variant="danger"
                  showdelete={showdelete}
                  onClick={() =>
                    setPantry([...pantry.filter((i) => i.name !== item.name)])
                  }
                >
                  Remove
                </StyledRemoveButton>
              </div>
            </div>
          </div>
        </StyledItem>
      ))}
      {filterPantry.length === 0 ? (
        <div>
          <h4 style={{ color: "grey" }}>No items here</h4>
        </div>
      ) : null}
    </ListGroup>
  );

  //Only show categories of current filtered pantry list
  const catList = [...new Set(filterPantry.map((item) => item.cat))].map(
    (c) => (
      <StyledCatPill
        c={c}
        categories={categories}
        onClick={() => (cat !== c ? setCat(c) : setCat("all"))}
      >
        <StyledBadge c={c} cat={cat} variant="danger">
          X
        </StyledBadge>
        <span style={{ color: "white" }}>{c}</span>
      </StyledCatPill>
    )
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "2rem .5rem .5rem 1rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "2rem",
          flexDirection: "column",
        }}
      >
        <h2>Your pantry</h2>
        <div style={{ display: "flex", justifyContent: "flex-between" }}>
          <StyledButton
            size="sm"
            variant="outline-success"
            onClick={() => setShowEdit(!showEdit)}
          >
            Add
          </StyledButton>
          <StyledButton
            size="sm"
            variant="outline-danger"
            onClick={() => setShowdelete(!showdelete)}
          >
            Delete
          </StyledButton>
        </div>
      </div>
      <Tab.Container id="left-tabs-example" defaultActiveKey="all">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="all" onClick={() => setFilter("all")}>
                  All
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fridge" onClick={() => setFilter("fridge")}>
                  Fridge
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="freeze"
                  onClick={() => setFilter("freezer")}
                >
                  Freezer
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="dry pantry"
                  onClick={() => setFilter("dry pantry")}
                >
                  Dry Pantry
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <StyledCol sm={9}>
            <div
              style={{
                display: "flex",
                marginBottom: "1rem",
                flexWrap: "wrap",
              }}
            >
              {catList}
            </div>
            <Tab.Content>
              <Tab.Pane eventKey="all">{pantryList}</Tab.Pane>
              <Tab.Pane eventKey="fridge">{pantryList}</Tab.Pane>
              <Tab.Pane eventKey="freeze">{pantryList}</Tab.Pane>
              <Tab.Pane eventKey="dry pantry">{pantryList}</Tab.Pane>
            </Tab.Content>
          </StyledCol>
        </Row>
      </Tab.Container>
      <PantryAddModal
        show={showEdit}
        onHide={() => setShowEdit(!showEdit)}
        handleAddItem={handleAddItem}
      />
    </div>
  );
}
