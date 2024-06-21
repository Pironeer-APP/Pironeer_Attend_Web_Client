// Header.js

import React from "react";
import styled from "styled-components";
import { COLORS } from "../../utils/theme";

const HeaderContainer = styled.div`
  background-color: ${COLORS.bg_black};
  padding: 2rem;
  text-align: center;
`;

const HeaderText = styled.h1`
  color: white;
  font-size: 3.2rem;
  margin: 0;
`;

const Header = ({ text }) => {
  return (
    <HeaderContainer>
      <HeaderText>{text}</HeaderText>
    </HeaderContainer>
  );
};

export default Header;
