import React from "react";
import styled from "styled-components";
import { COLORS } from "../utils/theme";
import { Container,ContentContainer } from "../components/common/Container";
import { PageHeader } from "../components/common/Header";
import { Gap } from "../components/common/Gap";
import { SmallButton } from "../components/common/Button";
import { useNavigate,useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import { fetchUserDepositDetails } from '../utils/mockApi';
import {
  BalanceContainer,
  BalanceTitle,
  BalanceAmount,
  BadgeContainer,
  BadgeText,
  TransactionList,
  Transaction,
} from '../components/admin/DepositForm';

const UserDepositPageContainer = styled(ContentContainer)`
  width: 100%;
  flex: 1; 
  padding-top: 10rem;
  overflow-y: auto; 
`;

export const useUserDepositDetails = () => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [shieldCount, setShieldCount] = useState(0);

  useEffect(() => {
    fetchUserDepositDetails()
      .then((data) => {
        setDetails(data);
        setShieldCount(data.shieldCount);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const increment = () => setShieldCount(shieldCount + 1);
  const decrement = () => {
    if (shieldCount > 0) setShieldCount(shieldCount - 1);
  };

  return { details, loading, error, shieldCount, increment, decrement };
};





const UserDepositPage = () => {
  const { userId } = useParams();
  const { details, loading, error } = useUserDepositDetails(userId);
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

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>Error: {error}</Container>;

  return (
    <Container backgroundColor={COLORS.bg_gray}>
      <PageHeader text={`${details.name}님 반가워요!`} buttons={buttons} bgColor={COLORS.bg_gray} color="black" />
      <UserDepositPageContainer backgroundColor={COLORS.bg_gray}>
        <BalanceContainer>
          <BalanceTitle>나의 보증금 현황</BalanceTitle>
          <BalanceAmount>{details.deposit.toLocaleString()}원</BalanceAmount>
        </BalanceContainer>
        <Gap />
        <BadgeContainer>
          <BadgeText>보증금 방어권 : {details.shieldCount}</BadgeText>
          <SmallButton onClick={() => alert('사용 clicked')} content="사용" fontSize={16}></SmallButton>
        </BadgeContainer>
        <Gap />
        <TransactionList>
          {details.transactions.map((transaction, index) => (
            <Transaction key={index} transaction={transaction} showActions={false} />
          ))}
        </TransactionList>
      </UserDepositPageContainer>
    </Container>
  );
};

export default UserDepositPage;