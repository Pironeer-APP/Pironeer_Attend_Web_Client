// UpdateDeposit.js
import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../utils/theme';
import { Container, ContentContainer, InputContainer } from '../common/Container';
import { PageHeader } from '../common/Header';
import { Gap } from '../common/Gap';
import { MainButton } from '../common/Button';
import { useNavigate } from 'react-router-dom';
import { useUserDepositDetails } from '../../pages/UserDepositPage'; // Ensure the path is correct
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
  const { details, loading, error } = useUserDepositDetails();

  const buttons = [
    {
      label: '로그아웃',
      bgColor: COLORS.orange,
      color: 'black',
      onClick: () => alert('로그아웃 clicked'),
    },
  ];

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>Error: {error}</Container>;

  const handleEdit = (transaction) => {
    alert(`수정 clicked for transaction: ${transaction.description}`);
  };

  const handleDelete = (transaction) => {
    alert(`삭제 clicked for transaction: ${transaction.description}`);
  };

  return (
    <Container backgroundColor={`${COLORS.bg_gray}`}>
      <PageHeader text={`어드민님 반가워요!`} buttons={buttons} bgColor={`${COLORS.bg_gray}`} color={"black"} />
      <UpdateDepositPageContainer backgroundColor={`${COLORS.bg_gray}`}>
        <InputContainer>
        <BalanceContainer>
          <BalanceTitle>{`${details.username}님의 보증금 현황`}</BalanceTitle>
          <BalanceAmount>{details.balance.toLocaleString()}원</BalanceAmount>
        </BalanceContainer>
        <MainButton content={"변경 완료"} onPress={() => alert('변경 완료 clicked')} marginBottom = "2.5"/>
        </InputContainer>
        <Gap />
        <TransactionList>
          {details.transactions.map((transaction, index) => (
            <Transaction
              key={index}
              transaction={transaction}
              showActions={true}
              onEdit={() => handleEdit(transaction)}
              onDelete={() => handleDelete(transaction)}
            />
          ))}
        </TransactionList>
      </UpdateDepositPageContainer>
    </Container>
  );
};

export default UpdateDeposit;
