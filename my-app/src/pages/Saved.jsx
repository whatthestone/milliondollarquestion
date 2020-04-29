import React, { useState } from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

const Saved = ({}) => {
  const [savedRecipes] = useState(
    JSON.parse(localStorage.getItem("savedRecipes"))
  );

  return (
    <div>
      {savedRecipes &&
        savedRecipes.map((recipe, key) => (
          <Card key={key} style={{ width: "18rem", margin: "0.5rem" }}>
            <Card.Img variant="top" src={recipe.image} />
            <Card.Body>
              <Card.Title>{recipe.title}</Card.Title>
              <Card.Text style={{ height: "100px", overflow: "hidden"}}>
                {recipe.extendedIngredients &&
                  recipe.extendedIngredients.map(ingredient => (`${ingredient.name},`))}
              </Card.Text>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

export default Saved;
