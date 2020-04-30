import React, { useState } from "react";
import styled from "styled-components";
import mediaHelper from "styled-media-helper";
import {
  Container,
  Card,
  CardColumns,
  Button
} from "react-bootstrap";


const media = mediaHelper({
  sm: 320,
  md: 768,
  lg: 992,
  xl: 1200
});

const SCardColumns = styled(CardColumns)`
  padding-top: 50px;

  ${media.only('sm')} {
    column-count: 2;
    font-size: 12px;
  }

  ${media.only('md')} {
    column-count: 3;
  }

  ${media.only('lg')} {
    column-count: 4;
  }

  ${media.only('xl')} {
    column-count: 5;
  }
`

const SHeader = styled.h3`
  padding-top: 30px;
  font-weight: 700 !important;
  text-align: center;

  ${media.only('sm')} {
    font-size: 20px;
  }

`

const SCardText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`

const SCardTitle = styled(Card.Title)`

  ${media.only('sm')} {
    font-size: 16px;
  }
`

const Subheader = styled.div`
  font-weight: 500;
  padding-top: 5px;
  padding-bottom: 5px;

  ${media.only('sm')} {
    font-size: 14px;
  }
`

const Saved = () => {
  const [savedRecipes] = useState(
    JSON.parse(localStorage.getItem("savedRecipes"))
  );

  return (
    <Container>
      <SHeader>Saved Recipes</SHeader>
      <SCardColumns>
        {savedRecipes &&
          savedRecipes.map((recipe, key) => (
            <Card key={key}>
              <Card.Img variant="top" src={recipe.image} />
              <Card.Body>
                <SCardTitle>{recipe.title}</SCardTitle>
                <SCardText style={{ maxLines: "5" }}>
                  <Subheader>Ingredients: </Subheader>
                  {recipe.extendedIngredients &&
                    recipe.extendedIngredients.map(
                      (ingredient, index) => index ? `, ${ingredient.name}` : `${ingredient.name}`
                    )}
                </SCardText>
                <Button style={{ marginTop: "10px"}} size="sm" block href={recipe.sourceUrl}>See recipe</Button>
              </Card.Body>
            </Card>
          ))}
      </SCardColumns>
    </Container>
  );
};

export default Saved;
