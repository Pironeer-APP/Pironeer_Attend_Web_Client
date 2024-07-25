import React, { useState, useEffect } from "react";
import { MainButton } from "../common/Button";
import { Container, InputContainer } from "../common/Container";
import { StyledInput } from "../common/Input";
import { useCreateSession } from "../../viewModel/adminHook";
import { checkAttendStart } from "../../utils/authentication";
import Logo from "../common/Logo";
import { Header } from "../common/Header";
import { useNavigate } from "react-router-dom";
import { checkAdminState } from "../../utils/authentication";
import {Gap} from "../common/Gap";



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

const CreateSessionPage = () => {
  const [isStart, setIsStart] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAttendStart(setIsStart);
    checkAdminState(navigate);
  }, [navigate]);

  return (
    <Container>
      <Header text={`반가워요, 어드민님!`} navigateOnClick="/admin"/>
      <InputContainer>
        <Gap />
        {isStart ? (
          <CreateSessionForm navigate={navigate} />
        ) : (
          <CreateSessionForm navigate={navigate} />
        )}
      </InputContainer>
    </Container>
  );
};

export default CreateSessionPage;
