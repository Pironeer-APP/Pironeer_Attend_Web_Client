import React from "react";
import styled from "styled-components";
import {  StyledText } from "./Text";
import { COLORS } from "../../utils/theme";
import { ButtonContainerStyled } from "./Container"; 


const MainButtonStyled = styled(ButtonContainerStyled)`
  width: 100%;
  padding: 15px 20px;
  background-color: ${(props) => props.backgroundColor || COLORS.green};
  border-radius: 15px;
  margin-top: 2.5rem;
  margin-bottom: ${(props) => props.marginBottom}rem;
`;

const SmallButtonStyled = styled.button`
  background-color: ${(props) => props.backgroundColor || COLORS.green};
  color: ${(props) => props.color || 'black'};
  font-size: ${(props) => props.fontSize}px;
  border: 1px solid backgroundColor;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px 0;
`;

const MainButton = ({
  content,
  onPress,
  fontSize = 22,
  marginBottom = 0,
  backgroundColor,
}) => {
  return (
    <MainButtonStyled
      marginBottom={marginBottom}
      onClick={onPress}
      backgroundColor={backgroundColor}
    >
      <StyledText
        content={content}
        fontSize={fontSize}
        color={COLORS.bg_black}
      />
    </MainButtonStyled>
  );
};

const SmallButton = ({ content, backgroundColor, color, onClick, fontSize=10 }) => {
  return (
    <SmallButtonStyled
      onClick={onClick}
      backgroundColor={backgroundColor}
      color={color}
      fontSize={fontSize}
    >
      {content}
    </SmallButtonStyled>
  );
}


export {
  MainButton,
  SmallButton
};

