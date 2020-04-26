import React, { Component } from "react";
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

class MDAnswer extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const recipe = this.props.recipe;

    return (
      <Container>
        <div>
          <Header>The Million Dollar Answer</Header>
          <SubHeader>This is what we suggest: </SubHeader>
        </div>
        <RecommendedCard recipe={recipe} />
        <Row>
          <OptionSelectionWrapper>
            <SButton variant="outline-primary" onClick={this.props.onEdit}>Edit</SButton>
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

export default MDAnswer;
