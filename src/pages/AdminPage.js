import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../components/common/Logo";
import {Container} from "../components/common/Container"; // Ensure this is the correct export
import {Header} from "../components/common/Header"; // Ensure this is the correct export
import CreateSessionForm from "../components/admin/CreatSession";
import AdminShow from "../components/admin/AdminShow";
import { checkAttendStart } from "../utils/stateCheck";
import { MainButton } from "../components/common/Button";
import { useNavigate } from "react-router-dom";
function AttendSuccess() {
  return (
    <div>
      <span>출석에 성공하였습니다!</span>
    </div>
  );
}
export default function AdminPage() {
  const [isStart, setIsStart] = useState(true);

  useEffect(() => {
    checkAttendStart(setIsStart);
  }, []);
  const navigate = useNavigate();

  const viewSessions = () => {
    navigate('/sessions');
  };


  return (
    <Container>
      <Logo />
      <Header text={`반가워요, 어드민님!`} />
      {isStart ? (
        <>
        <CreateSessionForm />
        </>
      ) : (
        <CreateSessionForm />
      )}
      <MainButton content={"전체 세션보기"} onPress={viewSessions}></MainButton>
    </Container>
  );
}
