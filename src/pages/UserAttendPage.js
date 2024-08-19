import React from "react";
import { COLORS } from "../utils/theme";
import AttendPinForm from "../components/user/AttendPinForm";
import AttendList from "../components/user/AttendList";
import { Container,ContentContainer } from "../components/common/Container";
import { PageHeader } from "../components/common/Header";
import { useUserAttendPage } from "../viewModel/userHook";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../viewModel/loginHook";
export default function UserAttendPage() {
  const { isStart, isAttend, setIsAttend, userId, username } = useUserAttendPage();
  const navigate = useNavigate();
  const { onPressLogout } = useLogin();
  const buttons = [
    {
      label: '보증금',
      bgColor: COLORS.green,
      color: 'black',
      onClick: () => navigate('/userDeposit'),
    },
    {
      label: '로그아웃',
      bgColor: COLORS.orange,
      color: 'black',
      onClick: () => onPressLogout(navigate),
    },
  ];
  return (
    <Container>
    <PageHeader text={`${username}님 반가워요!`} buttons={buttons}/>
    <ContentContainer>
      {isStart ? (
        <>
          {!isAttend && <AttendPinForm setIsAttend={setIsAttend} />}
          <AttendList userId={userId} />
        </>
      ) : (
        <AttendList userId={userId} />
      )}
    </ContentContainer>
    </Container>
  );
}
