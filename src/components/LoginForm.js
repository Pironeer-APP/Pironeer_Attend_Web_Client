import React from "react";
import styled from "styled-components";
import { COLORS } from "../utils/theme";
import { FontStyledText, StyledText } from "./common/Text";
import { useNavigate } from "react-router-dom";
import { InputContainer } from "./common/Container";
import { StyledInput } from "./common/Input";
import { MainButton } from "./common/Button";
import { useLogin } from "../viewModel/loginHook";

// LoginForm component
export default function LoginForm() {
  const navigate = useNavigate();
  const {
    username,
    password,
    loginStatus,
    onChangeUsername,
    setPassword,
    onPressLogin,
  } = useLogin();

  // 입력값에서 공백 제거
  const handleUsernameChange = (text) => {
    onChangeUsername(text.trim()); // 입력값에서 공백 제거
  };

  const handlePasswordChange = (text) => {
    setPassword(text.trim()); // 입력값에서 공백 제거
  };

  // Enter 키 이벤트 핸들러
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onPressLogin(navigate); // Enter 키를 눌렀을 때 로그인 함수 호출
    }
  };

  return (
    <InputContainer onKeyDown={handleKeyDown}>
      <StyledInput
        placeholder="이름"
        keyboardType="default"
        value={username}
        onChangeText={handleUsernameChange} // 공백 제거 로직 적용
        maxLength={50}
      />
      <StyledInput
        placeholder="비밀번호"
        value={password}
        onChangeText={handlePasswordChange} // 공백 제거 로직 적용
        secureTextEntry={true}
      />
      <MainButton content={"로그인"} onPress={() => onPressLogin(navigate)} />
      {!loginStatus && (
        <StyledText
          content={"일치하는 회원 정보가 없습니다."}
          fontSize={"1rem"}
          color={COLORS.green}
        />
      )}
    </InputContainer>
  );
}