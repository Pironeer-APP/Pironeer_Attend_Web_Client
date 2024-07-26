import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { InputContainer } from "../common/Container";
import { MainButton } from "../common/Button";
import { Header } from "../common/Header";
import AttendUpdateList from "./AttendUpdateList";
import { Container } from "../common/Container";
import { Gap } from "../common/Gap";
import {useCheckUserAttend} from "../../viewModel/adminHook";

const UpdateUserContainer = styled(InputContainer)`
  padding: 100px;
`;

const UpdateUserAttend = () => {
  const location = useLocation();
  const { userId } = location.state || {}; // 머지후 userStore에서 받아오는 방식으로 변경
  const navigate = useNavigate();
  const { handleUpdateAttendance, error } = useCheckUserAttend(userId, navigate);

  return (
    <Container>
      <Header text={`반가워요, 어드민님!`} navigateOnClick="/admin" />
      <MainButton
        content={"출석 정보 변경하기"}
        onPress={handleUpdateAttendance}
      />
      <Gap />
      <AttendUpdateList />
      {error && <div>Error: {error.message}</div>}
    </Container>
  );
};

export default UpdateUserAttend;
