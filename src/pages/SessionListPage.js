import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../utils/theme";
import { Header } from "../components/common/Header";
import { Container, InputContainer } from "../components/common/Container";
import SessionList from "../components/admin/SessionList";

const SessionListPage = () => {
  return (
    <Container>
      <Header text={`세션 리스트`} navigateOnClick="/admin" />
      <SessionList />
    </Container>
  );
};

export default SessionListPage;
