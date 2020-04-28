import React from "react";
import styled from "styled-components";
import { Row, Container, Button } from "react-bootstrap";
import RecommendedCard from "../components/RecommendedCard";

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
`;

const MDAnswer = ({ recipe, onEdit }) => {
  return (
    <Container style={{ marginTop: "2rem" }}>
      <div>
        <Header>The Million Dollar Answer</Header>
        <SubHeader>This is what we suggest: </SubHeader>
      </div>
      <RecommendedCard recipe={recipe} />
      <Row>
        <OptionSelectionWrapper>
          <SButton variant="outline-primary" onClick={onEdit}>
            Edit
          </SButton>
          <SButton>SAVE</SButton>
          <SButton variant="outline-primary">Another</SButton>
        </OptionSelectionWrapper>
      </Row>

      <h4>Similar Recipes</h4>
      <p>infinite scroll</p>
    </Container>
  );
};

export default MDAnswer;
