import React from "react";
import styled from "styled-components";
import { COLORS } from "../utils/theme";
import { Container,ContentContainer } from "../components/common/Container";
import { PageHeader } from "../components/common/Header";
import { Gap } from "../components/common/Gap";
import { SmallButton } from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { fetchUserDepositDetails } from '../utils/mockApi';

const UserDepositPageContainer = styled(ContentContainer)`
  width: 100%;
  flex: 1; 
  padding-top: 10rem;
  overflow-y: auto; 
`;

const BalanceContainer = styled.div`
  text-align: center;
`;

const BalanceTitle = styled.div`
  font-size: 18px;
  color: black;
  margin-bottom: 1.5rem;
`;

const BalanceAmount = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: black;
`;

const BadgeContainer = styled.div`
  background-color: black;
  color: white;
  padding: 2rem;
  margin: 3rem;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
`;

const BadgeText = styled.span`
  font-size: 16px;
`;



const TransactionList = styled.div`
  background-color: #000;
  border-radius: 30px 30px 0 0;
  flex-grow: 1; 
  overflow-y: auto; 
  width: 100%;
  `;

const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #fff;
  font-size: 16px;
  padding: 3rem;
`;

const TransactionDate = styled.div`
  width: 50px;
`;

const TransactionDescription = styled.div`
  flex: 1;
  text-align: left;
  padding-left: 10px;
`;

const TransactionAmount = styled.div`
  color: ${props => (props.positive ? '#00ff00' : '#ff0000')};
  font-weight: bold;
`;


const useUserDepositDetails = () => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserDepositDetails()
      .then((data) => {
        setDetails(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { details, loading, error };
};

const transactions = [
  { date: '9.30', description: '보증금 납입', amount: 80000 },
  { date: '9.30', description: '결석', amount: -20000 },
  { date: '9.30', description: '보증금 납입', amount: 80000 },
  { date: '9.30', description: '보증금 납입', amount: 80000 },
  { date: '9.30', description: '보증금 납입', amount: 80000 },
  { date: '9.30', description: '보증금 납입', amount: 80000 },
  { date: '9.30', description: '보증금 납입', amount: 80000 },
  { date: '9.30', description: '보증금 납입', amount: 80000 },
];


export default function UserDepositPage() {
  const { details, loading, error } = useUserDepositDetails();
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
    <Container backgroundColor={`${COLORS.bg_gray}`}>
      <PageHeader text={`${details.username}님 반가워요!`} buttons={buttons} bgColor={`${COLORS.bg_gray}`} color={"black"} />
      <UserDepositPageContainer backgroundColor={`${COLORS.bg_gray}`}>
        <BalanceContainer>
          <BalanceTitle>나의 보증금 현황</BalanceTitle>
          <BalanceAmount>{details.balance.toLocaleString()}원</BalanceAmount>
        </BalanceContainer>
        <Gap />
        <BadgeContainer>
          <BadgeText>보증금 방어권 : {details.shieldCount}</BadgeText>
          <SmallButton onClick={() => alert('사용 clicked')} content={"사용"} fontSize={16}></SmallButton>
        </BadgeContainer>
        <Gap />
        <TransactionList>
          {details.transactions.map((transaction, index) => (
            <TransactionItem key={index}>
              <TransactionDate>{transaction.date}</TransactionDate>
              <TransactionDescription>{transaction.description}</TransactionDescription>
              <TransactionAmount positive={transaction.amount > 0}>
                {transaction.amount > 0 ? '+' : ''}
                {transaction.amount.toLocaleString()}
              </TransactionAmount>
            </TransactionItem>
          ))}
        </TransactionList>
      </UserDepositPageContainer>
    </Container>
  );
}