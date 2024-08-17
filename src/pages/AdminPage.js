import React, { useState, useEffect } from "react";
import { COLORS } from "../utils/theme";
import { ContentContainer,Container, ButtonListContainer } from "../components/common/Container"; 
import { PageHeader } from "../components/common/Header"; 
import { MainButton } from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import { checkAdminState } from "../utils/authentication";

export default function AdminPage() {
  const navigate = useNavigate();
  const buttons = [
    {
      label: '로그아웃',
      bgColor: COLORS.orange,
      color: 'black',
      onClick: () => alert('로그아웃 clicked'),
    },
  ];

  useEffect(() => {
    checkAdminState(navigate);
  }, []);

  return (
    <Container>
      <PageHeader text={`어드민님 반가워요!`} buttons={buttons}/>
      <ContentContainer>
      <ButtonListContainer>
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
      <MainButton
        content={"보증금 조회"}
        onPress={() => navigate("/adminDeposit")}
      ></MainButton>
      </ButtonListContainer>
      </ContentContainer>
    </Container>
  );
}
