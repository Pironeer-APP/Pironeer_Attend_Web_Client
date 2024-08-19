import React from "react";
import { COLORS } from "../../utils/theme";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { ContentContainer, InputContainer } from "../common/Container";
import { MainButton } from "../common/Button";
import { PageHeader } from "../common/Header";
import AttendUpdateList from "./AttendUpdateList";
import { Container } from "../common/Container";
import { Gap } from "../common/Gap";
import {useCheckUserAttend} from "../../viewModel/adminHook";
import {useLogin} from "../../viewModel/loginHook";
const UpdateUserContainer = styled(InputContainer)`
  padding: 100px;
`;

const UpdateUserAttend = () => {
  const location = useLocation();
  const { userId } = location.state || {}; // 머지후 userStore에서 받아오는 방식으로 변경
  const navigate = useNavigate();
  const { handleUpdateAttendance, error } = useCheckUserAttend(userId, navigate);
  const { onPressLogout } = useLogin();

  const buttons = [
    {
      label: '로그아웃',
      bgColor: COLORS.orange,
      color: 'black',
      onClick: () => onPressLogout(navigate),
    },
  ];
  return (
    <Container>
      <PageHeader text={`어드민님 반가워요!`} navigateOnClick="/admin" buttons={buttons} />
      <ContentContainer>
      <InputContainer>
      <MainButton
        content={"출석 정보 변경하기"}
        onPress={handleUpdateAttendance}
      />
      <Gap />
      <AttendUpdateList />
      {error && <div>Error: {error.message}</div>}
      </InputContainer>
      </ContentContainer>
    </Container>
  );
};

export default UpdateUserAttend;
