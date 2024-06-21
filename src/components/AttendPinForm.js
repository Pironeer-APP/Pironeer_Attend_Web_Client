import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { COLORS } from "../utils/theme";
import { FontStyledText, StyledText } from "./common/Text";
import { useNavigate } from "react-router-dom";
import { InputContainer } from "./common/Container";
import StyledInput from "./common/Input";
import { client } from "../utils/client";
import { MainButton } from "./common/Button";

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

export default function AttendPinForm(props) {
  const navigate = useNavigate();
  const { pin, warning, onChangePin, onPressAttend } = useAttend();
  const setIsAttend = props.setIsAttend;

  return (
    <InputContainer>
      <StyledInput
        placeholder="출석코드"
        keyboardType="numeric"
        value={pin}
        onChangeText={onChangePin}
        maxLength={4}
      />
      <MainButton
        content={"출석하기"}
        onPress={() => onPressAttend(navigate, setIsAttend)}
      />
      {warning && (
        <StyledText content={warning} fontSize={"1rem"} color={COLORS.green} />
      )}
    </InputContainer>
  );
}

const StyledWarning = styled(FontStyledText)`
  color: ${COLORS.blood_red};
  margin: 0.5rem;
`;
