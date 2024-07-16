import React from "react";
import { Container, ScreenContainer } from "../../../common/Container";
import SignupForm from "./component/SignupForm";
import {Header} from "../../../common/Header";

export default function SignupPage() {
  return (
    <Container>
      <Header text={"피로그래밍 출석"} navigateOnClick="/admin"/>
      <ScreenContainer>
        <SignupForm />
      </ScreenContainer>
    </Container>
  );
}
