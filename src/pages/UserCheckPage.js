import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../assets/Theme";
import { client } from "../utils/client";
import Logo from "../components/Logo";
import Container from "../components/Container";
import AttendPinForm from "../components/AttendPinForm";
import AttendList from "../components/AttendList";

function checkUserState(navigate) {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin");

  // 인증 정보가 없을 경우
  if (!token || !isAdmin) {
    navigate("/");
  }

  // 운영진이라면 어드민 페이지로 이동
  if (isAdmin) {
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

export default function UserCheckPage() {
  const navigate = useNavigate();
  const [isStart, setIsStart] = useState(true);

  useEffect(() => {
    checkUserState(navigate);
    checkAttendStart(setIsStart);
  }, []);

  return (
    <Container>
      <Logo />
      {isStart && <AttendPinForm />}
      <AttendList />
    </Container>
  );
}
