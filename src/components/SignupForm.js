import React from "react";
import styled from "styled-components";
import { COLORS } from "../utils/theme";
import { StyledText, StyledWarning } from "./common/Text";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { client } from "../utils/client";
import { InputContainer } from "./common/Container";
import { StyledInput } from "./common/Input";
import { MainButton } from "./common/Button";

function useSignup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [signupStatus, setSignupStatus] = useState(true);

  const onChangeUsername = (value) => {
    setUsername(value);
  };

  const onChangePassword = (value) => {
    setPassword(value);
  };

  const onChangeEmail = (value) => {
    setEmail(value);
  };

  const onPressSignup = async (navigate) => {
    try {
      const response = await client.post("/user/signup", {
        username,
        password,
        email,
      });
      console.log(`username: ${username}`);
      console.log(`password: ${password}`);
      console.log(`email: ${email}`);

      // 240621 연우: 회원가입하면 바로 로그인할 수 있도록 수정해도 좋을 것 같습니다.
      navigate("/users");
    } catch (error) {
      console.error(error);
      setSignupStatus(false);
    }
  };

  return {
    username,
    password,
    email,
    signupStatus,
    onChangeUsername,
    onChangePassword,
    onChangeEmail,
    onPressSignup,
  };
}

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
