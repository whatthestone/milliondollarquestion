import React from "react";
import styled from "styled-components";

const StyledOptionBox = styled.div`
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  margin-top: 1rem;
  border: 1px solid
    ${({ type, option }) => (type === option ? "#ff6f3c" : "#303841")};
  background-color: ${({ type, option }) =>
    type === option ? "#ff6f3c" : "white"};
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

export default function QuestionItems({
  optionList,
  title,
  setOption,
  option,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "3rem",
      }}
    >
      <h4
        style={{
          textAlign: "left",
          color: "black",
          fontWeight: "bold",
          fontSize: "2rem",
        }}
      >
        {title}
      </h4>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          maxWidth: "30rem",
          // whiteSpace: "nowrap",
          // overflow: "auto",
        }}
      >
        {optionList.map((type) => (
          <StyledOptionBox
            key={type}
            type={type}
            option={option}
            onClick={() => setOption(type)}
          >
            <span
              style={{
                color: type === option ? "white" : "#303841",
                fontWeight: "500",
              }}
            >
              {type}
            </span>
          </StyledOptionBox>
        ))}
      </div>
    </div>
  );
}
