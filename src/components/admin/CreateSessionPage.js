import React, { useState, useEffect } from "react";
import { Container, ContentContainer, InputContainer } from "../common/Container";
import { checkAttendStart } from "../../utils/authentication";
import { Header } from "../common/Header";
import { useNavigate } from "react-router-dom";
import { checkAdminState } from "../../utils/authentication";
import {Gap} from "../common/Gap";
import {CreateSessionForm} from "./CreateSessionForm";




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
      <ContentContainer>
      <InputContainer>
        <Gap />
        {isStart ? (
          <CreateSessionForm navigate={navigate} />
        ) : (
          <CreateSessionForm navigate={navigate} />
        )}
      </InputContainer>
      </ContentContainer>
    </Container>
  );
};

export default CreateSessionPage;
