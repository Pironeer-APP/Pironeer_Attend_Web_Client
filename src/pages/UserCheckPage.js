import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../utils/theme";
import { client } from "../utils/client";
import Logo from "../components/common/Logo";
import AttendPinForm from "../components/AttendPinForm";
import AttendList from "../components/AttendList";
import { Container } from "../components/common/Container";
import {Header} from "../components/common/Header";

function checkUserState(navigate) {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");

  // 인증 정보가 없을 경우 로그인 페이지로 이동
  if (!token || !isAdmin) {
    navigate("/login");
  }

  // 운영진이라면 어드민 페이지로 이동
  if (isAdmin == "true") {
    navigate("/admin");
  }
}

async function checkAttendStart(setIsStart) {
  try {
    // 240620 연우: 출석 체크 API 아직 미완 -> 추후 수정하기
    const response = await client.get("/checkTime");
    if (response.isStart !== undefined) {
      setIsStart(response.isStart);
    }
  } catch (err) {
    console.log(err);
    setIsStart(false);
  }
}

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
  const userId = localStorage.getItem('id'); 
  useEffect(() => {
    if (!userId) {
      navigate('/login');
    }
  }, [userId, navigate]);

  // 출석 체크가 시작되었고, 현재 유저가 출석하지 않았다면 출석 창 보여주기
  // 출석 완료되었다면 완료 창 보여주기
  // 출석 기간이 아니면 Attend List만
  // useEffect(() => {
  //   checkUserState(navigate);
  //   checkAttendStart(setIsStart);
  // }, []);

  return (
    <Container>
      <Logo />
      <Header text={`반가워요, 000님!`} />
      {isStart && !isAttend && <AttendPinForm setIsAttend={setIsAttend} />}
      {isStart && isAttend && <AttendSuccess />}
      <AttendList userId={userId} />
    </Container>
  );
}
