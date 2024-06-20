import React from "react";
import styled from "styled-components";
import { COLORS } from "../utils/theme";
import { FontStyledText, StyledText } from "../components/Text";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { client } from "../utils/client";
import base64 from "base-64";

// LoginInput component
const StyledTextInput = styled.input`
  height: 5rem;
  margin-bottom: 2.5rem;
  font-size: 2rem;
  padding: 1rem 2rem;
  border-radius: 1rem;
  background-color: ${COLORS.gray};
  color: white;
  width: 100%;
  border: none;

  &::placeholder {
    color: ${COLORS.light_gray};
  }
`;

// 240620 연우: 이 input은 공용으로 빼도 좋을 거 같아요.
function LoginInput(props) {
  return (
    <StyledTextInput
      type={props.secureTextEntry ? "password" : "text"}
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.onChangeText(e.target.value)}
      maxLength={props.maxLength}
      {...(props.keyboardType === "numeric" ? { pattern: "[0-9]*" } : {})}
    />
  );
}

// useLogin Hook
function useLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(true);

  const onChangeUsername = (value) => {
    setUsername(value);
  };

  const onPressLogin = async (navigate) => {
    try {
      const response = await client.post("/user/login", {
        username,
        password,
      });
      console.log(response);

      // Assuming the response contains the token
      const { token, isAdmin } = response.data;
      localStorage.setItem(
        "token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjczZTNkMDY5OGU2ZmEzMWUwNzBjMmUiLCJfaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTcxODg3MTIwNiwiZXhwIjoxNzE4ODc0ODA2fQ.siBH0LMn1o_i0DmN-hr4uhzhoofDWg-2j4YBqi1ntS4"
      );
      localStorage.setItem("isAdmin", isAdmin);

      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      console.error(error);
      setLoginStatus(false);
    }
  };

  return {
    username,
    password,
    loginStatus,
    onChangeUsername,
    setPassword,
    onPressLogin,
  };
}

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
    <LoginInputContainer>
      <LoginInput
        placeholder="이름"
        keyboardType="default"
        value={username}
        onChangeText={onChangeUsername}
        maxLength={50}
      />
      <LoginInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <StyledLoginButton onClick={() => onPressLogin(navigate)}>
        로그인
      </StyledLoginButton>
      {!loginStatus && (
        <StyledWarning>일치하는 회원 정보가 없습니다.</StyledWarning>
      )}
    </LoginInputContainer>
  );
}

const LoginInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 50rem;
  margin: 0 auto;
  padding: 10rem;
  align-items: center;
`;

const StyledWarning = styled(FontStyledText)`
  color: red;
  margin: 0.5rem;
`;

const FindAccountButton = styled.button`
  align-self: center;
  padding: 2rem;
  background: none;
  border: none;
  cursor: pointer;
`;

const StyledLoginButton = styled.button`
  height: 5rem;
  margin-top: 2.5rem;
  font-size: 2rem;
  padding: 1rem 2rem;
  border-radius: 1rem;
  background-color: ${COLORS.green};
  color: white;
  width: 100%;
  border: none;
  cursor: pointer;
  text-align: center;
`;
