import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import styled from "styled-components";

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 3rem;
`;

const MyDropdownButton = ({ title, optionList, setOption, option }) => {
  return (
    <StyledBox>
      <DropdownButton
        id="dropdown-basic-button"
        title={option ? option : title}
      >
        {optionList.map((type, index) => (
          <Dropdown.Item key={index} onClick={() => setOption(type)}>
            {type}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </StyledBox>
  );
};

export default MyDropdownButton;
