
import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../utils/theme';
import { useLocation } from 'react-router-dom';
import { Container, ContentContainer, InputContainer } from '../common/Container';
import { PageHeader } from '../common/Header';
import { MainButton } from '../common/Button';
import { Gap } from '../common/Gap';
import { useNavigate } from 'react-router-dom';
import { useUserDepositDetails, DefendUse } from "../../viewModel/userHook";
import { useLogin } from "../../viewModel/loginHook";
import {
  BalanceContainer,
  BalanceTitle,
  BalanceAmount,
  BadgeContainer,
  BadgeText,
} from './DepositForm';


const CounterButton = styled.button`
  background-color: ${(props) => (props.color)};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin: 0 1rem;
  font-size: 18px;
  cursor: pointer;
`;


const UpdateDepositShield = () => {
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
    const increment = () => {
      alert("보증금 방어권 더하기");
    }
  const decrement = () => {
    alert("보증금 방어권 빼기");
  };
  
    if (loading) return <Container>Loading...</Container>;
    if (error) return <Container>Error: {error}</Container>;
    
  
    return (
      <Container>
        <PageHeader text={`어드민님 반가워요!`} buttons={buttons}  navigateOnClick="/admin" />
        <ContentContainer >
          <InputContainer>
          <BalanceContainer>
            <BalanceTitle color='white'>{`${depositData.user && depositData.user.username}님의 보증금 현황`}</BalanceTitle>
            <BalanceAmount color='white'>{depositData && depositData.defendCount}개</BalanceAmount>
          </BalanceContainer>
          <Gap />
        <BadgeContainer bgColor = {`${COLORS.dark_gray}`}>
        <CounterButton color={`${COLORS.red}`} onClick={decrement}>-</CounterButton>
          <BadgeText>보증금 방어권 : {depositData && depositData.defendCount}</BadgeText>
        <CounterButton color={`${COLORS.green}`} onClick={increment}>+</CounterButton>
        </BadgeContainer>
        <Gap />
          <MainButton content={"변경 완료"} onPress={() => alert('변경 완료 clicked')} marginBottom = "2.5"/>
          </InputContainer>
        </ContentContainer>
      </Container>
    );
  };

export  default UpdateDepositShield;
