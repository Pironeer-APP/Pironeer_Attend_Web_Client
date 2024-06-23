// src/components/AdminPage.js
import React from "react";
import styled from "styled-components";
import { COLORS } from "../utils/theme";
import Logo from "../components/common/Logo";
import { Container } from "../components/common/Container";
import Header from "../components/common/Header";

export default function AdminPage() {
  return (
    <Container>
      <Logo />
      <Header text={"반가워요, 어드민님!"} />
    </Container>
  );
}
