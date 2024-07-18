import React, { useState, useEffect } from "react";
import { MainButton } from "../common/Button";
import { Container, InputContainer } from "../common/Container";
import { StyledInput } from "../common/Input";
import { createSession } from "../../utils/admin";
import { checkAttendStart } from "../../utils/authentication";
import Logo from "../common/Logo";
import { Header } from "../common/Header";
import { useNavigate } from "react-router-dom";
import { checkAdminState } from "../../utils/authentication";
import {Gap} from "../common/Gap";

function useCreateSession(onSuccess) {
  const [sessionName, setSessionName] = useState("");
  const [date, setDate] = useState("");

  const onChangeSessionName = (value) => {
    setSessionName(value);
  };

  const onChangeDate = (value) => {
    setDate(value);
  };

  const onPressCreateSession = async () => {
    try {
      const formattedDate = new Date(date).toISOString();
      console.log("Formatted Date:", formattedDate);
      await createSession(sessionName, formattedDate);
      alert(`새로운 세션이 생성되었습니다.`);
      onSuccess();
    } catch (error) {
      console.error("Failed to create session:", error);
    }
  };

  return {
    sessionName,
    date,
    onChangeSessionName,
    onChangeDate,
    onPressCreateSession,
  };
}

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
