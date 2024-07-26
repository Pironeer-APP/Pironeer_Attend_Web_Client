import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { client } from "../../utils/client";
import { InputContainer } from "../../components/common/Container";
import { StyledInput } from "../../components/common/Input";
import { MainButton } from "../../components/common/Button";
import Logo from "../../components/common/Logo";
import { Header } from "../../components/common/Header";
import AttendUpdateList from "./AttendUpdateList";
import { Container } from "../common/Container";
import { checkAdminState } from "../../utils/stateCheck";
import { Gap } from "../common/Gap";
import useUserStore from '../../store/userStore';

const UpdateUserContainer = styled(InputContainer)`
  padding: 100px;
`;

const UpdateUser = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const navigate = useNavigate();
  const [attends, setAttends] = useState([]);
  const [updateAttends, setUpdateAttends] = useState([]);
  const { user } = useUserStore();

  useEffect(() => {
    if (!userId) {
      console.error("User ID is not provided");
      return;
    }
    checkAdminState(navigate);
  }, [userId]);

  const handleUpdateAttendance = async () => {
    const updateUserAttendance = async (update_info) =>
      await client.put(`/user/users/${userId}/attendance`, user.token, {
        userId: update_info.userId,
        sessionId: update_info.sessionId,
        attendIdx: update_info.attendIdx,
        status: update_info.status,
      });

    try {
      let isSuccess = true;
      updateAttends.map(async (update_info) => {
        const response = await updateUserAttendance(update_info);
        if (response.status == 200) {
          console.log(update_info);
        } else {
          isSuccess = false;
        }
      });
      if (isSuccess) {
        alert("출석 정보가 변경되었습니다.");
      } else {
        alert("출석 정보 변경에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("출석 정보 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <Header text={`반가워요, 어드민님!`} navigateOnClick="/admin"/>
      <MainButton
        content={"출석 정보 변경하기"}
        onPress={handleUpdateAttendance}
      />
      <Gap />
      <AttendUpdateList
        setUpdateAttends={setUpdateAttends}
        updateAttends={updateAttends}
      />
    </Container>
  );
};

export default UpdateUser;
