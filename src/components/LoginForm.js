import React from "react";
import styled from "styled-components";
import { COLORS } from "../assets/Theme";
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
      const response = await client.post("/login", {
        username,
        password,
      });

      // Assuming the response contains the token
      const { token } = response.data;
      const payload = token.substring(
        token.indexOf(".") + 1,
        token.lastIndexOf(".")
      );
      const decodedPayload = base64.decode(payload);
      const userId = decodedPayload._id;
      // 240620 연우: 아직 isAdmin 부분 어떻게 받는지 확정하지 않음. 추후 수정
      const isAdmin = decodedPayload._isAdmin;

      localStorage.setItem("token", token);
      localStorage.setItem("isAdmin", isAdmin);
      localStorage.setItem("userId", userId);

      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/userCheck");
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
