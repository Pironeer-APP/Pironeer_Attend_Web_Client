import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../utils/theme";
import { client } from "../utils/client";
import { checkUserState, checkAttendStart } from "../utils/stateCheck";
import Logo from "../components/common/Logo";
import AttendPinForm from "../components/AttendPinForm";
import AttendList from "../components/AttendList";
import { Container,ScreenContainer } from "../components/common/Container";
import { Header } from "../components/common/Header";
import Gap from "../components/common/Gap";

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
      const interval = setInterval(() => {
        checkAttendStart(setIsStart);
      }, 1000);
  
      // Set a timeout to clear the interval after 10 minutes (600,000 milliseconds)
      const timeout = setTimeout(() => {
        clearInterval(interval);
      }, 300000);
  
      // Clear the interval and timeout on component unmount or when isAttend changes
      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
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
