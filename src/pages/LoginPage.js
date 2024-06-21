// src/components/LoginPage.js
import React from "react";
import styled from "styled-components";
import { COLORS } from "../utils/theme";
import Logo from "../components/common/Logo";
import LoginForm from "../components/LoginForm";
import { Container, ScreenContainer } from "../components/common/Container";
import {Header} from "../components/common/Header";

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
