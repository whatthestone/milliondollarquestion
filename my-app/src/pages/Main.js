import React, { Component } from "react";
import styled from "styled-components";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import Recipe from "../components/Recipe.js";
import RecommendedCard from "../components/RecommendedCard.js";

const OptionSelectionWrapper = styled.div`
  text-align: center;
  width: 100%;
`;

const SButton = styled(Button)`
  margin: 5px;
`;

const Header = styled.h3`
  font-weight: 700;
  text-align: center;
`;

const SubHeader = styled.p`
  text-align: center;
`

class Main extends Component {
  render() {
    return (
      <Container>
        <div>
          <Header>The Million Dollar Answer</Header>
          <SubHeader>This is what we suggest: </SubHeader> 
        </div>
        <RecommendedCard />
        <Row>
          <OptionSelectionWrapper>
            <SButton variant="outline-primary">Edit</SButton>
            <SButton>SAVE</SButton>
            <SButton variant="outline-primary">Another</SButton>
          </OptionSelectionWrapper>
        </Row>

        <h4>Similar Recipes</h4>
        <p>infinite scroll</p>
      </Container>
    );
  }
}

export default Main;
