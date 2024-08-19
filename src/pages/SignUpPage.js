// src/components/LoginPage.js
import React from "react";
import { COLORS } from "../utils/theme";
import { Container, ContentContainer } from "../components/common/Container";
import SignupForm from "../components/SignupForm";
import { PageHeader} from "../components/common/Header";
import { useLogin } from "../viewModel/loginHook";
import { useNavigate } from "react-router-dom";
export default function SignupPage() {
  const { onPressLogout } = useLogin();
  const navigate = useNavigate();
  const buttons = [
    {
      label: '로그아웃',
      bgColor: COLORS.orange,
      color: 'black',
      onClick: () => onPressLogout(navigate),
    },
  ];
  return (
    <Container>
      <PageHeader text={"회원등록"} navigateOnClick="/admin" buttons={buttons}/>
      <ContentContainer>
        <SignupForm />
      </ContentContainer>
    </Container>
  );
}
