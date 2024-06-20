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

  const onPressAttend = async (navigate, setIsAttend) => {
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
        pin,
      });
      const { isAttend } = response.data;
      setIsAttend(setIsAttend);
      setPin("");
    } catch (error) {
      console.error(error);
      setIsAttend("오류");
    }
  };

  return {
    pin,
    warning,
    onChangePin,
    onPressAttend,
  };
}

function AttendResult(props) {
  const isAttend = props.isAttend;
  let result = "";
  let image = "";

  // 출석 상태에 따라 팝업 등장
  switch (isAttend) {
    case "출석":
      result = "출석 인증되었습니다!";
      image = "";
      break;
    case "지각":
      result = "지각 처리되었습니다.";
      image = "";
      break;
    case "결석":
      result = "결석 처리되었습니다.";
      image = "";
      break;
    default:
      result = "서버 오류로 출석에 실패했습니다. 잠시만 기다려 주세요.";
      image = "";
      break;
  }
  return (
    <div>
      <span>{result}</span>
      <img scr={image} />
    </div>
  );
}

export default function AttendPinForm() {
  const navigate = useNavigate();
  const [isAttend, setIsAttend] = useState();
  const { pin, warning, onChangePin, onPressAttend } = useAttend();

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
      {isAttend && <AttendResult isAttend={isAttend} />}
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
