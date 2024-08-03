import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../utils/theme";
import { client } from "../utils/client";
import { checkAttendStart } from "../utils/authentication";
import Logo from "../components/common/Logo";
import AttendPinForm from "../components/AttendPinForm";
import AttendList from "../components/AttendList";
import { Container, ScreenContainer } from "../components/common/Container";
import { Header } from "../components/common/Header";
import Gap from "../components/common/Gap";
import useUserStore from "../store/userStore";

export default function UserCheckPage() {
  const navigate = useNavigate();
  const [isStart, setIsStart] = useState(false);
  const [isAttend, setIsAttend] = useState(false);
  const { user } = useUserStore();

  // SSE를 활용한 출석 체크
  useEffect(() => {
    if (!isAttend) {
      checkAttendStart(setIsStart, user.token);
    }
  }, [isAttend]);

  // 출석 체크가 시작되었고, 현재 유저가 출석하지 않았다면 출석 창 보여주기
  // 출석 완료되었다면 완료 창 보여주기
  // 출석 기간이 아니면 Attend List만
  useEffect(() => {
    checkAttendStart(setIsStart, user.token);
  }, []);
  useEffect(() => {
    if (isAttend) {
      alert("출석에 성공하였습니다!");
    }
  }, [isAttend]);

  return (
    <Container>
      <Header text={`반가워요, ${user.username}님!`} />
      <ScreenContainer>
        {isStart ? (
          <>
            {!isAttend && <AttendPinForm setIsAttend={setIsAttend} />}
            <AttendList userId={user.id} />
          </>
        ) : (
          <AttendList userId={user.id} />
        )}
      </ScreenContainer>
    </Container>
  );
}
