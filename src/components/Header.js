// Header.js

import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../assets/Theme';


const HeaderContainer = styled.div`
  background-color: ${COLORS.bg_black};
  padding: 2rem;
  text-align: center;
`;

const HeaderText = styled.h1`
  color: white;
  font-size: 2.4rem;
  margin: 0;
`;

const Header = ({text}) => {
  return (
    <HeaderContainer>
      <HeaderText>{text}</HeaderText>
    </HeaderContainer>
  );
};

export default Header;
