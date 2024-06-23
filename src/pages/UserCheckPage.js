import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../utils/theme";
import { client } from "../utils/client";
import { checkUserState, checkAttendStart } from "../utils/stateCheck";
import Logo from "../components/common/Logo";
import AttendPinForm from "../components/AttendPinForm";
import AttendList from "../components/AttendList";
import { Container } from "../components/common/Container";
import { Header } from "../components/common/Header";

function AttendSuccess() {
  return (
    <div>
      <span>출석에 성공하였습니다!</span>
    </div>
  );
}

export default function UserCheckPage() {
  const navigate = useNavigate();
  const [isStart, setIsStart] = useState(true);
  const [isAttend, setIsAttend] = useState(false);
  const userId = localStorage.getItem("id");
  const username = localStorage.getItem("username"); 

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);

  // 출석 체크가 시작되었고, 현재 유저가 출석하지 않았다면 출석 창 보여주기
  // 출석 완료되었다면 완료 창 보여주기
  // 출석 기간이 아니면 Attend List만
  useEffect(() => {
    checkUserState(navigate);
    checkAttendStart(setIsStart);
  }, []);

  return (
    <Container>
      <Logo />
      <Header text={`반가워요, ${username}님!`} /> 
      {isStart ? (
        <>
          {!isAttend && <AttendPinForm setIsAttend={setIsAttend} />}
          {isAttend && <AttendSuccess/>}
        </>
      ) : (
        <AttendList userId={userId} />
      )}
    </Container>
  );
}
