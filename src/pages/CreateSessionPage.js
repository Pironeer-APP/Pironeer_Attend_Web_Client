import React, { useState, useEffect } from "react";
import { Container, InputContainer } from "../components/common/Container";
import { checkAttendStart } from "../utils/stateCheck";
import { Header } from "../components/common/Header";
import { useNavigate } from "react-router-dom";
import { checkAdminState } from "../utils/stateCheck";
import { Gap } from "../components/common/Gap";
import useUserStore from "../store/userStore";
import CreateSessionForm from "../components/admin/CreateSessionForm";

const CreateSessionPage = () => {
  const [isAttendStart, setIsAttendStart] = useState(true);
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAttendStart(setIsAttendStart, user.token);
    checkAdminState(navigate, user.token, user.isAdmin);
  }, [user.token, user.isAdmin, navigate]);

  return (
    <Container>
      <Header text={`반가워요, 어드민님!`} navigateOnClick="/admin"/>
      <InputContainer>
        <Gap />
        {isAttendStart ? (
          <CreateSessionForm navigate={navigate} />
        ) : (
          <CreateSessionForm navigate={navigate} />
        )}
      </InputContainer>
    </Container>
  );
};

export default CreateSessionPage;
