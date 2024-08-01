import React from "react";
import AttendPinForm from "../components/user/AttendPinForm";
import AttendList from "../components/user/AttendList";
import { Container,ContentContainer } from "../components/common/Container";
import { Header } from "../components/common/Header";
import { useUserAttendPage } from "../viewModel/userHook";

export default function UserAttendPage() {
  const { isStart, isAttend, setIsAttend, userId, username } = useUserAttendPage();

  return (
    <Container>
    <Header text={`반가워요, ${username}님!`} />
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
