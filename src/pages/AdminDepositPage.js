import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../utils/theme";
import { PageHeader } from "../components/common/Header";
import { Container, ContentContainer, InputContainer } from "../components/common/Container";
import { ItemBox } from "../components/common/Box";
import { fetchUserDeposits } from "../utils/mockApi";
import { useUserList } from "../viewModel/adminHook";
import { useUserDepositDetails } from "../viewModel/userHook";
import { useLogin } from "../viewModel/loginHook";
const useDepositList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserDeposits()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { users, loading, error };
};

const DepositItemBox = ({ user }) => {
  const navigate = useNavigate();
  const { depositData, loading, error } = useUserDepositDetails(user?._id);

  const depositDetails = [
    { content: depositData.user && depositData.user.username, fontSize: 15, weight: 500 },
    { content: `보증금: ${depositData.deposit && depositData.deposit.toLocaleString()}원`, fontSize: 10 },
    { content: `방어권: ${depositData && depositData.defendCount}개`, fontSize: 10 },
  ];

  const depositActions = [
    { content: "보증금 방어권", onClick: () => navigate("/updateDepositShield", { state: { userId: user?._id } }) },
    { content: "보증금 내역", onClick: () => navigate("/updateDeposit", { state: { userId: user?._id } }) },
  ];

  return <ItemBox item={user} itemDetails={depositDetails} itemActions={depositActions} />;
};

const AdminDepositPage = () => {
  const { users, loading, error } = useUserList();
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
    <Container>
      <PageHeader text={`어드민님 반가워요!`} navigateOnClick="/admin" buttons={buttons} />
      <ContentContainer>
        <InputContainer>
          {users.map((user) => (
            <DepositItemBox key={user?._id} user={user} />
          ))}
        </InputContainer>
      </ContentContainer>
    </Container>
  );
};

export default AdminDepositPage;