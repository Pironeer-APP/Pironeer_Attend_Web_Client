import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../utils/theme";
import { Header } from "../components/common/Header";
import { Container, InputContainer } from "../components/common/Container";
import SessionList from "../components/admin/SessionList";

const SessionItem = styled.div`
  display: flex;
  width: calc(100% - 40px);
  justify-content: space-between;
  align-items: center; // Center align items vertically
  padding: 20px;
  border: 1px solid ${COLORS.green};
  border-radius: 5px;
  background-color: ${COLORS.black};
`;

const DeleteButton = styled.button`
  background-color: ${COLORS.red};
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const SessionDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const SessionName = styled.div`
  margin-bottom: 10px;
`;

const SessionListPage = () => {
  return (
    <Container>
      <Header text={`세션 리스트`} navigateOnClick="/admin" />
      <SessionList />
    </Container>
  );
};

export default SessionListPage;
