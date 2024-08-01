import React from "react";
import { COLORS } from "../utils/theme";
import { Container,ContentContainer } from "../components/common/Container";
import { PageHeader } from "../components/common/Header";
import { useNavigate } from "react-router-dom";
export default function UserDepositPage() {
    const username = sessionStorage.getItem("username");
    const navigate = useNavigate();
    const buttons = [
      {
        label: '출석',
        bgColor: COLORS.green,
        color: 'black',
        onClick: () => navigate('/'),
      },
      {
        label: '로그아웃',
        bgColor: COLORS.orange,
        color: 'black',
        onClick: () => alert('로그아웃 clicked'),
      },
    ];

  return (
    <Container>
    <PageHeader text={`${username}님 반가워요!`} buttons={buttons}/>
    <ContentContainer>
      
    </ContentContainer>
    </Container>
  );
}
