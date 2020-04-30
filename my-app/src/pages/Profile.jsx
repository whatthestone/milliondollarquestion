import React, { useState, useEffect } from "react";
import { Button, ListGroup, Image, Nav, Tab, Row, Col } from "react-bootstrap";
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

export default function Profile() {
  const [pantry, setPantry] = useState(
    JSON.parse(localStorage.getItem("pantry")) || [
      { name: "rice", expiry: "1587513600", location: "dry pantry" },
      { name: "egg", expiry: "1588204800", location: "dry pantry" },
      { name: "ham", expiry: "1588377600", location: "fridge" },
      { name: "ice cream", expiry: "1588742721", location: "freezer" },
      { name: "cheese", expiry: "1588742721", location: "fridge" },
      { name: "bacon", expiry: "1588742721", location: "fridge" },
      { name: "celery", expiry: "1588742721", location: "fridge" },
      { name: "carrots", expiry: "1588118400", location: "fridge" },
    ]
  );
  const [showEdit, setShowEdit] = useState(false);
  const [showdelete, setShowdelete] = useState(false);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("pantry", JSON.stringify(pantry));
  }, [pantry]);

  const handleAddItem = ({ itemName, expiry, location }) => {
    const newPantry = [...pantry, { name: itemName, expiry, location }];
    setPantry(newPantry);
  };

  //List or card? TODO: Not sure why ellipsis doesnt appear when title overflow.
  const pantryList = (
    <ListGroup>
      {pantry
        .filter((item) => (filter === "all" ? item : filter === item.location))
        .map((item, key) => (
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
                      : moment
                          .unix(item.expiry)
                          .isBefore(moment().add(2, "days"))
                      ? "#f90"
                      : "green",
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
                  justifyContent: "flex-end",
                  alignItems: "center",
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
                  {showdelete ? (
                    <Button
                      variant="danger"
                      onClick={() =>
                        setPantry([
                          ...pantry.filter((i) => i.name !== item.name),
                        ])
                      }
                    >
                      Remove
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
          </StyledItem>
        ))}
    </ListGroup>
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
            variant="outline-success"
            onClick={() => setShowEdit(!showEdit)}
          >
            Add
          </StyledButton>
          <StyledButton
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
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="all">{pantryList}</Tab.Pane>
              <Tab.Pane eventKey="fridge">{pantryList}</Tab.Pane>
              <Tab.Pane eventKey="freeze">{pantryList}</Tab.Pane>
              <Tab.Pane eventKey="dry pantry">{pantryList}</Tab.Pane>
            </Tab.Content>
          </Col>
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
