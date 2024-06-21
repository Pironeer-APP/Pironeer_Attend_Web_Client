// src/components/LoginPage.js
import React from "react";
import styled from "styled-components";
import { COLORS } from "../utils/theme";
import Logo from "../components/Logo";
import Container from "../components/Container";
import SignupForm from "../components/SignupForm";
import Header from "../components/Header";

export default function SignupPage() {
  return (
    <Container>
      <ScreenContainer>
        <Logo />
        <Header text={"피로그래밍 출석"} />
        <SignupForm />
      </ScreenContainer>
    </Container>
  );
}

const ScreenContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 2rem;
`;
