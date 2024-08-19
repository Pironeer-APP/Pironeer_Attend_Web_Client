
import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../utils/theme';
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
// export const useUserDepositDetails = () => {
//   const [details, setDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [shieldCount, setShieldCount] = useState(0);

//   useEffect(() => {
//     fetchUserDepositDetails()
//       .then((data) => {
//         setDetails(data);
//         setShieldCount(data.shieldCount);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   const increment = () => setShieldCount(shieldCount + 1);
//   const decrement = () => {
//     if (shieldCount > 0) setShieldCount(shieldCount - 1);
//   };

//   return { details, loading, error, shieldCount, increment, decrement };
// };

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
  const userId = sessionStorage.getItem("id");
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
    const increment = () => setDepositData(depositData.defendCount + 1);
  const decrement = () => {
    if (depositData.defendCount > 0) setDepositData(depositData.defendCount - 1);
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
