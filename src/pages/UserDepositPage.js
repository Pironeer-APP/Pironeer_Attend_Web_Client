import React from "react";
import styled from "styled-components";
import { COLORS } from "../utils/theme";
import { Container,ContentContainer } from "../components/common/Container";
import { PageHeader } from "../components/common/Header";
import { Gap } from "../components/common/Gap";
import { SmallButton } from "../components/common/Button";
import { useNavigate } from "react-router-dom";
import { useUserDepositDetails, DefendUse } from "../viewModel/userHook";
import { useLogin } from "../viewModel/loginHook";
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







const UserDepositPage = () => {
  const userId = sessionStorage.getItem("id");
  const { depositData, setDepositData,loading, error } = useUserDepositDetails(userId);
  const navigate = useNavigate();
  const { onPressLogout } = useLogin();

  const handleUseDefend = async () => {
    if (depositData?.defendCount === 0) {
      alert('사용 가능한 보증금 방어권이 없습니다.');
      return;
    }
  
    try {
      const response = await DefendUse(userId);
  
      alert(response.message);
  
      const updatedDefendCount = response.defendList.filter(defend => !defend.status).length;
  
      setDepositData(prevData => ({
        ...prevData,
        deposit: response.deposit, 
        deductionList: response.deductionList, 
        defendList: response.defendList, 
        defendCount: updatedDefendCount 
      }));
    } catch (err) {
      console.error(err);
    }
  };
  
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
      onClick: () => onPressLogout(navigate),
    },
  ];

  if (error) return <Container>Error: {error}</Container>;

  return (
    <Container backgroundColor={COLORS.bg_gray}>
      <PageHeader text={`${depositData.user && depositData.user.username}님 반가워요!`} buttons={buttons} bgColor={COLORS.bg_gray} color="black" />
      <UserDepositPageContainer backgroundColor={COLORS.bg_gray}>
        <BalanceContainer>
          <BalanceTitle>나의 보증금 현황</BalanceTitle>
          <BalanceAmount>{depositData.deposit && depositData.deposit.toLocaleString()}원</BalanceAmount>
        </BalanceContainer>
        <Gap />
        <BadgeContainer>
          <BadgeText>보증금 방어권 : {depositData && depositData.defendCount}</BadgeText>
          <SmallButton onClick={handleUseDefend} content="사용" fontSize={16}></SmallButton>
        </BadgeContainer>
        <Gap />
        <TransactionList>
          {depositData.deductionList && depositData.deductionList.map((deductionItem, index) => (
            <Transaction key={index} deductionItem={deductionItem} showActions={false} />
          ))}
        </TransactionList>
      </UserDepositPageContainer>
    </Container>
  );
};

export default UserDepositPage;