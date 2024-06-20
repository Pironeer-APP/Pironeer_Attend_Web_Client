import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "../assets/Theme";
import { FontStyledText, StyledText } from "../components/Text";
import { useNavigate } from "react-router-dom";

import { client } from "../utils/client";

function AttendInput(props) {
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

// useAttend Hook
function useAttend() {
  const [pin, setPin] = useState("");
  const [warning, setWarning] = useState("");

  const onChangePin = (value) => {
    setPin(value);
  };

  const onPressAttend = async (navigate, setIsAttend, setMsg) => {
    const token = localStorage.getItem("token");
    console.log(pin);

    // 숫자가 아닌 경우 경고
    if (isNaN(pin)) {
      setPin("");
      setWarning("출석 코드는 0~9의 숫자로 이루어져야 합니다.");
      return;
    }
    // 네자리가 아닌 경우 경고
    if (pin.length !== 4) {
      setPin("");
      setWarning("출석코드는 4자리 숫자로 이루어져야 합니다.");
      return;
    }
    // 정상 입력된 경우 기존의 경고 삭제
    setWarning("");

    // 서버에 출석 정보 전달
    try {
      const response = await client.post(`/checkAttend/${token}`, {
        code: pin,
      });
      const { msg } = response.data;
      // 240620 연우: response code 확인 어떻게 하는지는 서버 복구되면 체크
      if (response.status === 200) {
        setIsAttend(true);
      }
      setWarning(msg);
    } catch (error) {
      console.log("server error!");
      setWarning("서버 오류로 인해 출석 체크에 실패했습니다.");
    }
    setPin("");
  };

  return {
    pin,
    warning,
    onChangePin,
    onPressAttend,
  };
}

function AttendResult() {
  return <div></div>;
}

export default function AttendPinForm(props) {
  const navigate = useNavigate();
  const { pin, warning, onChangePin, onPressAttend } = useAttend();
  const setIsAttend = props.setIsAttend;

  return (
    <div>
      <AttendInput
        placeholder="출석코드"
        keyboardType="numeric"
        value={pin}
        onChangeText={onChangePin}
        maxLength={4}
      />
      <StyledLoginButton onClick={() => onPressAttend(navigate, setIsAttend)}>
        출석하기
      </StyledLoginButton>
      {warning && <StyledWarning>{warning}</StyledWarning>}
    </div>
  );
}

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

const StyledWarning = styled(FontStyledText)`
  color: red;
  margin: 0.5rem;
`;
