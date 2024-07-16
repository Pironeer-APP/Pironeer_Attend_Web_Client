import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkUserState, checkAttendStart } from "../../utils/stateCheck";
import AttendPinForm from "./component/AttendPinForm";
import AttendList from "./component/AttendList";
import { Container,ScreenContainer } from "../../common/Container";
import { Header } from "../../common/Header";

export default function UserCheckPage() {
  const navigate = useNavigate();
  const [isStart, setIsStart] = useState(false);
  const [isAttend, setIsAttend] = useState(false);
  const userId = sessionStorage.getItem("id");
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);

  // Polling checkAttendStart every second if not attended
  useEffect(() => {
    if (!isAttend) {
      checkAttendStart(setIsStart);
    }
  }, [isAttend]);

  // 출석 체크가 시작되었고, 현재 유저가 출석하지 않았다면 출석 창 보여주기
  // 출석 완료되었다면 완료 창 보여주기
  // 출석 기간이 아니면 Attend List만
  useEffect(() => {
    checkUserState(navigate);
    checkAttendStart(setIsStart);
  }, []);
  useEffect(() => {
    if (isAttend) {
      alert("출석에 성공하였습니다!");
    }
  }, [isAttend]);

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
