import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "../utils/theme";
import { checkUserState, checkAttendStart } from "../utils/stateCheck";
import { FontStyledText, StyledText } from "./common/Text";
import { useNavigate } from "react-router-dom";
import { client } from "../utils/client";
import { MainButton } from "./common/Button";

// useUserList Hook
function useUserList() {
  const onChangePin = (value) => {
    setPin(value);
  };

  return {};
}

function UserInfoContainer(props) {
  const { key, ...filteredProps } = props;
  // 유저별 정보 확인 -> 출석 정보 페이지, 유저 정보 수정 페이지, 삭제 버튼 생성
  return (
    <div>
      {filteredProps.map((content, key) => {
        return <StyledText content={content} />;
      })}
      <div>
        <MainButton />
        <SubMainButton />
        <SubMainButton />
      </div>
    </div>
  );
}

export default function UserList(props) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [warning, setWarning] = useState("");
  const {} = useUserList();

  // 현재 유저가 어드민이 아닌지 확인
  // useEffect(() => {
  //   checkUserState(navigate);
  // }, []);

  // 유저 정보 불러오기
  useEffect(async () => {
    const response = await client.get("/user/users");
    if (response.status == 200) {
      setUsers(response.data);
    } else {
      setWarning(response.msg);
    }
  });

  return (
    <div>
      {users.map((user, key) => {
        return <CardInfoContainer key={key} user={user} />;
      })}
    </div>
  );
}
