import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../components/common/Logo";
import { Container } from "../components/common/Container"; // Ensure this is the correct export
import { Header } from "../components/common/Header"; // Ensure this is the correct export
import { MainButton } from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import { checkAdminState } from "../utils/stateCheck";
import useUserStore from "../store/userStore";

export default function AdminPage() {
  const navigate = useNavigate();
  const { user } = useUserStore();

  useEffect(() => {
    checkAdminState(navigate, user.token, user.isAdmin);
  }, []);

  return (
    <> 
      <Header text={`반가워요, 어드민님!`} />
      <Container>
      <MainButton
        content={"세션 생성"}
        onPress={() => navigate("/createSession")}
      ></MainButton>
      <MainButton
        content={"전체 세션 조회"}
        onPress={() => navigate("/sessions")}
      ></MainButton>
      <MainButton
        content={"전체 유저 조회"}
        onPress={() => navigate("/users")}
      ></MainButton>
      <MainButton
        content={"회원 등록"}
        onPress={() => navigate("/signup")}
      ></MainButton>
    </Container>
    </>
  );
}
