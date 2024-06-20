// src/components/LoginPage.js
import React from "react";
import styled from "styled-components";
import { COLORS } from "../utils/theme";
import Logo from "../components/Logo";
import LoginForm from "../components/LoginForm";
import Container from "../components/Container";

export default function LoginPage() {
  return (
    <Container>
      <LoginScreenContainer>
        <Logo />
        <LoginForm />
      </LoginScreenContainer>
    </Container>
  );
}

const LoginScreenContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 2rem;
`;
