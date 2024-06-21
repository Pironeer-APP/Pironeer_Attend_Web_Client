// src/components/LoginPage.js
import React from "react";
import styled from "styled-components";
import { COLORS } from "../utils/theme";
import Logo from "../components/Logo";
import LoginForm from "../components/LoginForm";
import Container from "../components/Container";
import Header from "../components/Header";

export default function LoginPage() {
  return (
    <Container>
      <ScreenContainer>
        <Logo />
        <Header text={"피로그래밍 출석"} />
        <LoginForm />
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
