import React from "react";
import { MainButton } from "../common/Button";
import {  InputContainer } from "../common/Container";
import { StyledInput } from "../common/Input";
import { useCreateSession } from "../../viewModel/adminHook";


const CreateSessionForm = ({ navigate }) => {
    const onSuccess = () => {
      navigate("/sessions");
    };
  
    const {
      sessionName,
      date,
      onChangeSessionName,
      onChangeDate,
      onPressCreateSession,
    } = useCreateSession(onSuccess);
  
    return (
      <InputContainer>
        <StyledInput
          placeholder="세션 이름"
          keyboardType="default"
          value={sessionName}
          onChangeText={onChangeSessionName}
          maxLength={50}
        />
        <StyledInput
          type="date"
          placeholder="세션 날짜(YYYY-MM-DD)"
          value={date}
          onChangeText={onChangeDate}
        />
        <MainButton content="세션 생성" onPress={onPressCreateSession} />
      </InputContainer>
    );
  };
  export { CreateSessionForm };