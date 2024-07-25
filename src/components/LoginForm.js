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

  return (
    <InputContainer>
      <StyledInput
        placeholder="이름"
        keyboardType="default"
        value={username}
        onChangeText={onChangeUsername}
        maxLength={50}
      />
      <StyledInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
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
