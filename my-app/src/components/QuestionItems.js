import React from "react";
import styled from "styled-components";

const StyledOptionBox = styled.div`
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  margin-top: 1rem;
  border: 1px solid
    ${({ type, option }) => (type === option ? "green" : "black")};
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-10px);
  }
`;

export default function QuestionItems({
  optionList,
  title,
  setOption,
  option,
}) {
  return (
    <div style={{ marginBottom: "3rem" }}>
      <h4 style={{ textAlign: "left" }}>{title}</h4>
      <div
        style={{
          display: "flex",
          whiteSpace: "nowrap",
          overflow: "auto",
        }}
      >
        {optionList.map((type) => (
          <StyledOptionBox
            type={type}
            option={option}
            onClick={() => setOption(type)}
          >
            <a
              style={{
                color: type === option ? "green" : "black",
                fontWeight: "500",
              }}
            >
              {type}
            </a>
          </StyledOptionBox>
        ))}
      </div>
    </div>
  );
}
