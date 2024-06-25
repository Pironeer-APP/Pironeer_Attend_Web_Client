// src/components/LoginPage.js
import React from "react";
import styled from "styled-components";
import { COLORS } from "../utils/theme";
import Logo from "../components/common/Logo";
import { Container, ScreenContainer } from "../components/common/Container";
import SignupForm from "../components/SignupForm";
import {Header} from "../components/common/Header";

export default function SignupPage() {
  return (
    <Container>
      <Header text={"피로그래밍 출석"} />
      <ScreenContainer>
        <SignupForm />
      </ScreenContainer>
    </Container>
  );
}
