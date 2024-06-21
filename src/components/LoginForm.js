import React from "react";
import styled from "styled-components";
import { COLORS } from "../utils/theme";
import { FontStyledText, StyledText } from "./common/Text";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { client } from "../utils/client";
import { jwtDecode } from "jwt-decode";
import { InputContainer } from "./common/Container";
import StyledInput from "./common/Input";
import { MainButton } from "./common/Button";

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
      const token = response.token;
      const decodedToken = jwtDecode(token);
      const isAdmin = decodedToken._isAdmin;
      console.log(decodedToken);

      localStorage.setItem("token", token);
      localStorage.setItem("id", decodedToken._id);
      localStorage.setItem("isAdmin", decodedToken._isAdmin);

      if (isAdmin === "true") {
        navigate("/admin");
      } else {
        navigate("/");
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
