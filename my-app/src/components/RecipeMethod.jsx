import React, { Component } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 30px;
`;

class RecipeMethod extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const methods = this.props.methods;
    return (
      <Wrapper>
        <h4>Method</h4>
        {methods &&
          methods.map((methodSet, key) => {
            return (
              <div key={key}>
                <h5>{methodSet.name}</h5>
                {methodSet.steps.map((method, key) => {
                  return (
                    <p key={key}>
                      {method.number}: {method.step}
                    </p>
                  );
                })}
              </div>
            );
          })}
      </Wrapper>
    );
  }
}

export default RecipeMethod;
