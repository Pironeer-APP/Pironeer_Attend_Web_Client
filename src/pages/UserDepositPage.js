import React from "react";
import { Container,ContentContainer } from "../components/common/Container";
import { Header } from "../components/common/Header";

export default function UserDepositPage() {
    const username = sessionStorage.getItem("username");

  return (
    <Container>
    <Header text={`반가워요, ${username}님!`} />
    <ContentContainer>
      
    </ContentContainer>
    </Container>
  );
}
