import styled from "styled-components";
import { COLORS } from "../../utils/theme";

// 전체 페이지 레이아웃
const Container = styled.div`
  background-color: ${COLORS.bg_black};
  display: flex;
  flex-direction: column;
  margin: 2rem;
`;

// 세로 full 페이지 레이아웃
// 100vh 페이지에서 사용
const ScreenContainer = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  flex-direction: column;
  gap: 2rem;
`;

// 입력창 (로그인, 회원가입, 출석 코드 입력) 레이아웃
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 50rem;
  margin: 0 auto;
  align-items: center;
  gap: 2rem;
`;

export { Container, InputContainer, ScreenContainer };
