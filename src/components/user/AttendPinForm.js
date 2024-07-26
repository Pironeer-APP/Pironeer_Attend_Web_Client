//component of UserCheckPage
import React from "react";
import {  StyledWarning } from "../common/Text";
import { useNavigate } from "react-router-dom";
import { InputContainer } from "../common/Container";
import {StyledInput} from "../common/Input";
import { MainButton } from "../common/Button";
import { useAttend } from "../../viewModel/userHook";


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
        <StyledWarning content={warning} />
      )}
    </InputContainer>
  );
}


