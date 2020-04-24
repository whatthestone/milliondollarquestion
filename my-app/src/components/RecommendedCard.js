import React, { Component } from "react";
import styled from "styled-components";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import Recipe from "./Recipe.js";

const SCard = styled(Card)`
  max-width: 1016px;
  margin: auto;
  border-radius: 20px;
  overflow: hidden;
`;

const SCardTitle = styled.h4`
  font-weight: 700;
  padding-top: 15px;
`;

const SCardText = styled.div`
  padding: 20px;
`;

const NavArea = styled.div`
  padding: 20px;
`;

const Image = styled.img`
  width: 100%;
  height: 700px;
  background: url("https://www.thespruceeats.com/thmb/ltMha1iXJIttnXv9EDQf9WFSrEE=/3896x2922/smart/filters:no_upscale()/hainanese-chicken-rice-very-detailed-recipe-3030408-hero-0a742f08c72044e999202a44e30a1ea7.jpg")
    no-repeat center;
  background-size: cover;
  padding: -15px;
`;

const ImgCol = styled(Col)`
  padding-right: 0px;
`;

const Link = styled.a`
  text-decoration: underline;
  color: black;
`;

class RecommendedCard extends Component {
  render() {
    return (
      <SCard>
        <Row>
          <ImgCol>
            <Image />
          </ImgCol>
          <Col>
            <SCardText>
              <NavArea></NavArea>
              <Link href="www.kitchen.com/recipe" target="_blank">
                www.kitchen.com
              </Link>
              <SCardTitle>Chicken Rice</SCardTitle>
              <Recipe />
              <Button variant="primary">Go to site</Button>
            </SCardText>
          </Col>
        </Row>
      </SCard>
    );
  }
}

export default RecommendedCard;
