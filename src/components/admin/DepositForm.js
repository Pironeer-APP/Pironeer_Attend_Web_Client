// DepositComponents.js
import React from 'react';
import styled from 'styled-components';
import { SmallButton } from '../common/Button';
import { COLORS } from '../../utils/theme';
import {  getLocal } from '../../utils/date';
export const BalanceContainer = styled.div`
  text-align: center;
`;

export const BalanceTitle = styled.div`
  font-size: 18px;
  color: ${(props) => props.color || 'black'};
  margin-bottom: 1.5rem;
`;

export const BalanceAmount = styled.div`
  font-size: 36px;
  font-weight: bold;
  color: ${(props) => props.color || 'black'};
`;

export const BadgeContainer = styled.div`
  background-color: ${(props) => props.bgColor || 'black'};
  color: white;
  padding: 2rem;
  margin: 3rem;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
`;

export const BadgeText = styled.span`
  font-size: 16px;
`;

export const TransactionList = styled.div`
  background-color: #000;
  border-radius: 30px 30px 0 0;
  flex-grow: 1;
  overflow-y: auto;
  width: 100%;
`;

export const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  color: #fff;
  font-size: 16px;
  padding: 3rem;
`;

export const TransactionDate = styled.div`
  width: 50px;
`;

export const TransactionDescription = styled.div`
  flex: 1;
  text-align: left;
  padding-left: 10px;
`;

export const TransactionAmount = styled.div`
  color: ${(props) => (props.positive ? '#00ff00' : '#ff0000')};
  font-weight: bold;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const Transaction = ({ deductionItem, showActions, onEdit, onDelete }) => {
  const {month,date} = getLocal(deductionItem.deductionDate);
  return (
  <TransactionItem>
    <TransactionDate>{`${month}.${date}`}</TransactionDate>
    <TransactionDescription>{deductionItem.deductionDetail}</TransactionDescription>
    <TransactionAmount positive={deductionItem.deductedAmount > 0}>
      {deductionItem.deductedAmount > 0 ? '+' : ''}
      {deductionItem.deductedAmount.toLocaleString()}
      {showActions && (
      <ActionButtons>
        <SmallButton onClick={onEdit} content={"수정"} fontSize={16} backgroundColor={COLORS.green} color={'black'} />
        <SmallButton onClick={onDelete} content={"삭제"} fontSize={16} backgroundColor={COLORS.red} color={'black'} />
      </ActionButtons>
    )}
    </TransactionAmount>
    
  </TransactionItem>
  );
};
