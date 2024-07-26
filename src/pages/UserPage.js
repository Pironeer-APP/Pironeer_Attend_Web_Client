import React from "react";
import AttendPinForm from "../components/user/AttendPinForm";
import AttendList from "../components/user/AttendList";
import { Container,ScreenContainer } from "../components/common/Container";
import { Header } from "../components/common/Header";
import { useUserCheckPage } from "../viewModel/userHook";

export default function UserCheckPage() {
  const { isStart, isAttend, setIsAttend, userId, username } = useUserCheckPage();

  return (
    <Container>
    <Header text={`반가워요, ${username}님!`} />
    <ScreenContainer>
      {isStart ? (
        <>
          {!isAttend && <AttendPinForm setIsAttend={setIsAttend} />}
          <AttendList userId={userId} />
        </>
      ) : (
        <AttendList userId={userId} />
      )}
    </ScreenContainer>
    </Container>
  );
}
