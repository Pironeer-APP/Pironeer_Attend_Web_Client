import React from "react";
import styled from "styled-components";
import { FontStyledText, StyledText } from "./Text";
import { COLORS } from "../../utils/theme";

const ButtonContainerStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => `${props.paddingV}px ${props.paddingH}px`};
  background-color: ${(props) =>
    props.outline ? "transparent" : COLORS.green};
  border: ${(props) => (props.outline ? `3px solid ${COLORS.green}` : "none")};
  border-radius: 15px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const ButtonContainer = ({
  outline = false,
  paddingH = 20,
  paddingV = 15,
  onPress,
  children,
}) => {
  return (
    <ButtonContainerStyled
      outline={outline}
      paddingH={paddingH}
      paddingV={paddingV}
      onClick={onPress}
    >
      {children}
    </ButtonContainerStyled>
  );
};

const MainButtonStyled = styled(ButtonContainerStyled)`
  width: 100%;
  padding: 15px 20px;
  background-color: ${COLORS.green};
  border-radius: 15px;
  margin-top: 2.5rem;
  margin-bottom: ${(props) => props.marginBottom}px;
`;

const MainButton = ({ content, onPress, fontSize = 22, marginBottom = 0 }) => {
  return (
    <MainButtonStyled marginBottom={marginBottom} onClick={onPress}>
      <StyledText
        content={content}
        fontSize={fontSize}
        color={COLORS.bg_black}
      />
    </MainButtonStyled>
  );
};

const MiniButtonStyled = styled(ButtonContainerStyled)`
  height: 50px;
  background-color: ${(props) =>
    props.outline ? "transparent" : COLORS.green};
  border-color: ${COLORS.green};
  border-width: 3px;
`;

const MiniButton = ({ outline, onPress, children }) => {
  return (
    <MiniButtonStyled outline={outline} onClick={onPress}>
      <FontStyledText
        style={{ color: outline ? "white" : "#000000", fontSize: 18 }}
      >
        {children}
      </FontStyledText>
    </MiniButtonStyled>
  );
};

const LoginButtonStyled = styled(ButtonContainerStyled)`
  height: 60px;
  background-color: ${COLORS.green};
  border-radius: 15px;
`;

const LoginButton = ({ onPress, children }) => {
  return (
    <LoginButtonStyled onClick={onPress}>
      <FontStyledText
        style={{ fontSize: 20, textAlign: "center", color: "#000000" }}
      >
        {children}
      </FontStyledText>
    </LoginButtonStyled>
  );
};

const ArrowButtonStyled = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
`;

const LeftArrowBtn = ({ onPress, size = 20, color }) => {
  return (
    <ArrowButtonStyled onClick={onPress}>
      <img
        src={
          color === "white"
            ? "/images/icons/left-arrow-white.png"
            : "/images/icons/left-arrow.png"
        }
        alt="Left Arrow"
        style={{ width: size, height: "auto" }}
      />
    </ArrowButtonStyled>
  );
};

const RightArrowBtn = ({ onPress, size = 10 }) => {
  return (
    <ArrowButtonStyled onClick={onPress}>
      <img
        src="/images/icons/right-arrow.png"
        alt="Right Arrow"
        style={{ width: size, height: "auto" }}
      />
    </ArrowButtonStyled>
  );
};

const UnTouchableRightArrow = ({ size = 10 }) => (
  <img
    src="/images/icons/right-arrow.png"
    alt="Right Arrow"
    style={{ width: size, height: "auto" }}
  />
);

const CouponButtonStyled = styled(ButtonContainerStyled)`
  background-color: ${COLORS.lightTheme_btn};
  border-radius: 10px;
  padding: 20px;
`;

const CouponButton = ({ selected, content, onPress }) => {
  return (
    <CouponButtonStyled onClick={onPress}>
      <StyledText content={content} fontSize={20} color="black" weight={600} />
    </CouponButtonStyled>
  );
};

const ConfirmSmallBtnStyled = styled(ButtonContainerStyled)`
  background-color: ${COLORS.green};
  border-radius: 30px;
  position: absolute;
  right: 5px;
  padding: 5px 10px;
`;

const ConfirmSmallBtn = ({ content }) => {
  return (
    <ConfirmSmallBtnStyled>
      <FontStyledText
        style={{ color: COLORS.bg_black, fontSize: 16, textAlign: "center" }}
      >
        {content}
      </FontStyledText>
    </ConfirmSmallBtnStyled>
  );
};

export {
  ButtonContainer,
  MainButton,
  MiniButton,
  LoginButton,
  LeftArrowBtn,
  RightArrowBtn,
  UnTouchableRightArrow,
  CouponButton,
  ConfirmSmallBtn,
};
