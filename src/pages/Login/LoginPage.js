// src/components/LoginPage.js
import React from "react";
import { Container, ScreenContainer } from "../../common/Container";
import {Header} from "../../common/Header";
import LoginForm from "./component/LoginForm";


export default function LoginPage() {
  return (
    <Container>
      <Header text={"피로그래밍 출석"} />
      <ScreenContainer>
        <LoginForm />
      </ScreenContainer>
    </Container>
  );
}


