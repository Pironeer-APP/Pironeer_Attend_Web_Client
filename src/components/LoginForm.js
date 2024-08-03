import React from "react";
import styled from "styled-components";
import { COLORS } from "../utils/theme";
import { FontStyledText, StyledText } from "./common/Text";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { client } from "../utils/client";
import { jwtDecode } from "jwt-decode";
import { InputContainer } from "./common/Container";
import { StyledInput } from "./common/Input";
import { MainButton } from "./common/Button";
import useUserStore from "../store/userStore";

// useLogin Hook
function useLogin() {
  const [error, setError] = useState(false);
  const { user, loginUser, logoutUser, changeUsername, changePassword } =
    useUserStore();

  const onChangeUsername = (value) => {
    changeUsername(value);
  };

  const onChangePassword = (value) => {
    changePassword(value);
  };

  const onPressLogin = async (navigate) => {
    try {
      const response = await client.post("/user/login", user.token, {
        username: user.username,
        password: user.password,
      });

      // Check if the response contains the token inside the data object
      if (!response || !response.data || !response.data.token) {
        throw new Error("Invalid response: No token found");
      }

      const token = response.data.token;

      // Ensure the token is a string
      if (typeof token !== "string") {
        throw new Error("Invalid token: Token is not a string");
      }

      const decodedToken = jwtDecode(token);

      // state 처리가 비동기임.
      loginUser({
        id: decodedToken._id,
        isAdmin: decodedToken._isAdmin,
        token: token,
      });

      navigate(decodedToken._isAdmin ? "/admin" : "/");
    } catch (error) {
      console.error(error);
      logoutUser();
      setError(true);
    }
  };

  return {
    user,
    error,
    onChangeUsername,
    onChangePassword,
    onPressLogin,
  };
}

// LoginForm component
export default function LoginForm() {
  const navigate = useNavigate();
  const { user, error, onChangeUsername, onChangePassword, onPressLogin } =
    useLogin();

  return (
    <InputContainer>
      <StyledInput
        placeholder="이름"
        keyboardType="default"
        value={user.username}
        onChangeText={onChangeUsername}
        maxLength={50}
      />
      <StyledInput
        placeholder="비밀번호"
        value={user.password}
        onChangeText={onChangePassword}
        secureTextEntry={true}
      />
      <MainButton content={"로그인"} onPress={() => onPressLogin(navigate)} />
      {error && (
        <StyledText
          content={"일치하는 회원 정보가 없습니다."}
          fontSize={"1rem"}
          color={COLORS.green}
        />
      )}
    </InputContainer>
  );
}
