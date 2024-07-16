import React, { useState, useEffect } from "react";
import { Container, InputContainer } from "../../../common/Container";
import { checkAttendStart } from "../../../utils/stateCheck";
import { Header } from "../../../common/Header";
import { useNavigate } from "react-router-dom";
import { checkAdminState } from "../../../utils/stateCheck";
import {Gap} from "../../../common/Gap";
import { CreateSessionForm } from "./component/CreateSessionForm";

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
