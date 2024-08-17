// src/components/LoginPage.js
import React from "react";
import { COLORS } from "../utils/theme";
import { Container, ContentContainer } from "../components/common/Container";
import SignupForm from "../components/SignupForm";
import { PageHeader} from "../components/common/Header";

export default function SignupPage() {
  const buttons = [
    {
      label: '로그아웃',
      bgColor: COLORS.orange,
      color: 'black',
      onClick: () => alert('로그아웃 clicked'),
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
