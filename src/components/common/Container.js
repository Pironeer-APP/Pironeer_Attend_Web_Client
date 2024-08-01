import styled from "styled-components";
import { COLORS } from "../../utils/theme";

// 전체 페이지 레이아웃
const Container = styled.div`
  background-color: ${(props) => props.backgroundColor || COLORS.bg_black};
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

// 세로 full 페이지 레이아웃
// 100vh 페이지에서 사용
const ContentContainer = styled.div`
  background-color: ${(props) => props.backgroundColor || COLORS.bg_black};
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  padding-top: 10rem;
  width: 100%;
`;

// 입력창 (로그인, 회원가입, 출석 코드 입력) 레이아웃
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 45rem;
  margin: 0 auto;
  align-items: center;
  gap: 2rem 4rem;
`;
const ButtonContainerStyled = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => `${props.paddingV}px ${props.paddingH}px`};
  background-color: ${(props) =>
    props.outline ? "transparent" : props.backgroundColor || COLORS.green};
  border: ${(props) => (props.outline ? `3px solid ${COLORS.green}` : "none")};
  border-radius: 15px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const MainButtonContainer = ({
  outline = false,
  paddingH = 20,
  paddingV = 15,
  onPress,
  children,
  backgroundColor,
}) => {
  return (
    <ButtonContainerStyled
      outline={outline}
      paddingH={paddingH}
      paddingV={paddingV}
      onClick={onPress}
      backgroundColor={backgroundColor}
    >
      {children}
    </ButtonContainerStyled>
  );
};
const TwoButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const HeaderContainer = styled.div`
  background-color: ${COLORS.bg_black};
  padding: 3rem 0;
  text-align: center;
  width: 100%;
  cursor: pointer;
  position: fixed;
`;
const PageHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) => props.backgroundColor || COLORS.bg_black};
  padding-top: 3rem;
  width: 80%;
  cursor: pointer;
  position: fixed;
  z-index: 1000;
`;
const HeaderButtonContainer = styled.div`
  display: flex;
  gap: 4rem;
`;
const ButtonListContainer = styled.div`
  width: 40%;
`;

export {
  Container,
  InputContainer,
  ContentContainer,
  HeaderContainer,
  PageHeaderContainer,
  MainButtonContainer,
  HeaderButtonContainer,
  TwoButtonContainer,
  ButtonContainerStyled,
  ButtonListContainer,
};
