// UpdateDeposit.js
import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../utils/theme';
import { Container, ContentContainer, InputContainer } from '../common/Container';
import { PageHeader } from '../common/Header';
import { Gap } from '../common/Gap';
import { MainButton } from '../common/Button';
import { useUserDepositDetails, DefendUse } from "../../viewModel/userHook";
import { useLogin } from "../../viewModel/loginHook";
import { useNavigate,useLocation } from 'react-router-dom';
import {
  BalanceContainer,
  BalanceTitle,
  BalanceAmount,
  TransactionList,
  Transaction,
} from './DepositForm';

const UpdateDepositPageContainer = styled(ContentContainer)`
  width: 100%;
  flex: 1;
  padding-top: 10rem;
  overflow-y: auto;
`;



const UpdateDeposit = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const { depositData, setDepositData,loading, error } = useUserDepositDetails(userId);
  const { onPressLogout } = useLogin();
  const navigate = useNavigate();
  const buttons = [
    {
      label: '로그아웃',
      bgColor: COLORS.orange,
      color: 'black',
      onClick: () => onPressLogout(navigate),
    },
  ];

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>Error: {error}</Container>;

  

  return (
    <Container backgroundColor={`${COLORS.bg_gray}`}>
      <PageHeader text={`${depositData.user && depositData.user.username}님 반가워요!`} buttons={buttons} bgColor={`${COLORS.bg_gray}`} color={"black"} navigateOnClick="/admin" />
      <UpdateDepositPageContainer backgroundColor={`${COLORS.bg_gray}`}>
        <InputContainer>
        <BalanceContainer>
          <BalanceTitle>{`${depositData.user && depositData.user.username}님의 보증금 현황`}</BalanceTitle>
          <BalanceAmount>{depositData.deposit && depositData.deposit.toLocaleString()}원</BalanceAmount>
        </BalanceContainer>
        <Gap></Gap>
        </InputContainer>
        <Gap />
        <TransactionList>
          {depositData.deductionList && depositData.deductionList.map((deductionItem, index) => (
            <Transaction
              key={index}
              deductionItem={deductionItem}
              showActions={false}
            />
          ))}
        </TransactionList>
      </UpdateDepositPageContainer>
    </Container>
  );
};

export default UpdateDeposit;
