import React, { useState, useEffect } from "react";
import { Button, ListGroup, Card, Image } from "react-bootstrap";
import styled from "styled-components";
import PantryAddModal from "../components/PantryAddModal";

const StyledListGroup = styled(ListGroup)`
  display: flex;
`;

const StyledContainer = styled.div`
  padding: 2rem;
`;

const StyledItem = styled(ListGroup.Item)`
  display: flex;
  flexdirection: row;
  justify-content: flex-start;
  padding: 0;
  height: 6rem;
`;

const StyledButton = styled(Button)`
  margin-left: 1rem;
`;

export default function Profile() {
  const [pantry, setPantry] = useState(
    JSON.parse(localStorage.getItem("pantry")) || []
  ); //{ name: "ham", expiry: "2weeks" }

  const [showEdit, setShowEdit] = useState(false);
  const [showdelete, setShowdelete] = useState(false);

  useEffect(() => {
    localStorage.setItem("pantry", JSON.stringify(pantry));
  }, [pantry]);

  const handleAddItem = ({ itemName, expiry }) => {
    const newPantry = [...pantry, { name: itemName, expiry }];
    setPantry(newPantry);
  };

  //List or card? TODO: Not sure why ellipsis doesnt appear when title overflow.
  const pantryList = (
    <StyledListGroup>
      {pantry.map((item, key) => (
        <StyledItem key={key}>
          <Image
            style={{ height: "100%", width: "5rem" }}
            src={`https://spoonacular.com/cdn/ingredients_100x100/${item.name.toLowerCase()}.jpg`}
          />
          <div
            style={{
              padding: "1rem",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <h4
              style={{
                marginRight: "1rem",
              }}
            >
              {item.name}
            </h4>
            <p style={{ color: "grey" }}>{item.expiry}</p>
          </div>
          {showdelete ? (
            <Button
              variant="danger"
              style={{ marginRight: 0, marginLeft: "auto", borderRadius: 0 }}
              onClick={() =>
                setPantry([...pantry.filter((i) => i.name !== item.name)])
              }
            >
              Remove
            </Button>
          ) : null}
        </StyledItem>
      ))}
    </StyledListGroup>
  );

  // const pantryList = pantry.map((item) => (
  //   <StyledCard>
  //     <StyledCardImg
  //       variant="top"
  //       src={`https://spoonacular.com/cdn/ingredients_100x100/${item.name}.jpg`}
  //     />
  //     <Card.Body>
  //       <Card.Title>{item.name}</Card.Title>
  //       <Card.Subtitle style={{ color: "grey" }}>{item.expiry}</Card.Subtitle>
  //     </Card.Body>
  //   </StyledCard>
  // ));
  return (
    <StyledContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "1rem",
          flexWrap: "wrap",
          flexDirection: "column",
        }}
      >
        <h2>Your pantry</h2>
        <div style={{ display: "flex", justifyContent: "flex-between" }}>
          <StyledButton
            variant="success"
            onClick={() => setShowEdit(!showEdit)}
          >
            Add
          </StyledButton>
          <StyledButton
            variant="danger"
            onClick={() => setShowdelete(!showdelete)}
          >
            Delete
          </StyledButton>
        </div>

        <PantryAddModal
          show={showEdit}
          onHide={() => setShowEdit(!showEdit)}
          handleAddItem={handleAddItem}
        />
      </div>
      {pantryList}
    </StyledContainer>
  );
}
