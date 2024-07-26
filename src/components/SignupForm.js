import React from "react";
import styled from "styled-components";
import { COLORS } from "../utils/theme";
import { StyledText, StyledWarning } from "./common/Text";
import { useNavigate } from "react-router-dom";
import { InputContainer } from "./common/Container";
import { StyledInput } from "./common/Input";
import { MainButton } from "./common/Button";
import { useSignup } from "../viewModel/signUpHook"


// SignupForm component
export default function SignupForm() {
  const navigate = useNavigate();
  const {
    username,
    password,
    email,
    signupStatus,
    onChangeUsername,
    onChangePassword,
    onChangeEmail,
    onPressSignup,
  } = useSignup();

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
        placeholder="이메일"
        keyboardType="default"
        value={email}
        onChangeText={onChangeEmail}
        maxLength={50}
      />
      <StyledInput
        placeholder="비밀번호"
        value={password}
        onChangeText={onChangePassword}
        secureTextEntry={true}
      />
      <MainButton
        content={"회원가입"}
        onPress={() => onPressSignup(navigate)}
      />
      {!signupStatus && (
        <StyledText
          content={"회원 가입에 실패했습니다. 다시 시도해주세요."}
          fontSize={"1rem"}
          color={COLORS.green}
        />
      )}
    </InputContainer>
  );
}
