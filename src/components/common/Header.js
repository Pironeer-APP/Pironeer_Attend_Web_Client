import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../utils/theme.js';
import { LeftArrowBtn } from './Button.js';
import { StyledText } from './Text.js';
import Logo from './Logo.js';
import { useNavigate } from 'react-router-dom';

const RowView = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const HeaderContainer = styled.div`
  background-color: ${COLORS.bg_black};
  padding-top: 2.5rem;
  text-align: center;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  cursor: pointer;
`;

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

const HeaderDetailContainer = styled.div`
  padding: 20px ${({ paddingHorizontal }) => paddingHorizontal || 20}px;
  background-color: ${({ backgroundColor }) => backgroundColor || 'transparent'};
  z-index: 50;
  position: relative;
`;

const Button = styled.button`
  background-color: ${COLORS.green};
  padding: 7px 14px;
  border-radius: 10px;
  position: absolute;
  right: 0;
  border: none;
  cursor: pointer;
`;

const Spacer = styled.div`
  width: 20px;
`;

const HeaderDetail = ({
  title,
  button = false,
  buttonOnPress = () => {},
  backgroundColor = 'transparent',
  color,
  paddingHorizontal = 20,
}) => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <HeaderDetailContainer backgroundColor={backgroundColor} paddingHorizontal={paddingHorizontal}>
      <RowView>
        <LeftArrowBtn onClick={handleGoBack} color={color} />
        <StyledText content={title} fontSize={20} />
        {button ? (
          <>
            <Spacer />
            <Button onClick={buttonOnPress}>
              <StyledText content={button} fontSize={17} color={'black'} />
            </Button>
          </>
        ) : (
          <Spacer />
        )}
      </RowView>
    </HeaderDetailContainer>
  );
};

const HeaderAdminContainer = styled.div`
  padding: 20px 0;
`;

const HeaderAdmin = ({ title, onPress }) => {
  return (
    <HeaderAdminContainer>
      <RowView>
        <LeftArrowBtn onClick={onPress} />
        <StyledText content={title} fontSize={24} />
        <Spacer />
      </RowView>
    </HeaderAdminContainer>
  );
};

export { HeaderDetail, HeaderAdmin, Header, RowView };
