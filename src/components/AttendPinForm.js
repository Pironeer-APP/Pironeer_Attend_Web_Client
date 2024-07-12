import React, { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../utils/theme";
import { FontStyledText, StyledText } from "./common/Text";
import { useNavigate } from "react-router-dom";
import { InputContainer } from "./common/Container";
import {StyledInput} from "./common/Input";
import { client } from "../utils/client";
import { MainButton } from "./common/Button";

function useAttend() {
  const [pin, setPin] = useState("");
  const [warning, setWarning] = useState("");

  
  const onChangePin = (value) => {
    setPin(value);
  };

  const onPressAttend = async (navigate, setIsAttend) => {
    const userId = sessionStorage.getItem("id");

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
      const endpoint = `/session/checkAttend/${userId}`;
      const body = { code: pin };

      const response = await client.post(endpoint, body);
      
      if (response.status === 201) {
        setIsAttend(true);
      }
      setWarning(response.message);
    }  catch (error) {
      setWarning(error);
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
        <StyledText content={warning} fontSize={15} color={COLORS.green} />
      )}
    </InputContainer>
  );
}

const StyledWarning = styled(FontStyledText)`
  color: ${COLORS.red};
  margin: 0.5rem;
`;
