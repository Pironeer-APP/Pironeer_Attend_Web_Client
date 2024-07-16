import React from 'react';
import styled from 'styled-components';
import Logo from './Logo.js';
import { useNavigate } from 'react-router-dom';
import { HeaderContainer } from './Container.js';


const HeaderText = styled.h1`
  color: white;
  font-size: 2.4rem;
  margin: 0;
`;

const Header = ({ text, navigateOnClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigateOnClick);
  };

  return (
    <HeaderContainer onClick={handleClick}>
      <HeaderText>{text}</HeaderText>
      <Logo />
    </HeaderContainer>
  );
};

export { Header };
