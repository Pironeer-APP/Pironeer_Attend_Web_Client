import React, { useState, useEffect } from "react";
import { Container } from "../../../common/Container"; 
import { Header } from "../../../common/Header"; 
import { MainButton } from "../../../common/Button";
import { useNavigate } from "react-router-dom";
import { checkAdminState } from "../../../utils/stateCheck";

export default function AdminPage() {
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminState(navigate);
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
