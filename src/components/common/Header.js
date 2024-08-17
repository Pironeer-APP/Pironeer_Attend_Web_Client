import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../utils/theme.js';
import { StyledText } from './Text.js';
import { useNavigate } from 'react-router-dom';
import { HeaderContainer,PageHeaderContainer, HeaderButtonContainer } from './Container.js';
import { SmallButton } from './Button.js';


const HeaderText = styled.h1`
  color: ${(props) => props.color || "white"};
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
    </HeaderContainer>
  );
};
const PageHeader = ({ text, buttons, navigateOnClick, bgColor, color }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(navigateOnClick);
  };

  return (
    <PageHeaderContainer backgroundColor={bgColor}>
      <HeaderText onClick={handleClick} color={color}>{text}</HeaderText>
      <HeaderButtonContainer>
      {buttons.map((button, index) => (
          <SmallButton
            key={index}
            backgroundColor={button.bgColor}
            color={button.color}
            onClick={button.onClick}
            content={button.label}
            fontSize={12}
          >
          </SmallButton>
        ))}
      </HeaderButtonContainer>
    </PageHeaderContainer>
  );
};
export { Header,PageHeader };
