import React, { useState, useEffect } from "react";
import { Container, InputContainer } from "../components/common/Container";
import { Header } from "../components/common/Header";
import { useNavigate } from "react-router-dom";
import { Gap } from "../components/common/Gap";
import useUserStore from "../store/userStore";
import CreateSessionForm from "../components/admin/CreateSessionForm";

const CreateSessionPage = () => {
  const { user } = useUserStore();
  const navigate = useNavigate();

  return (
    <Container>
      <Header text={`반가워요, 어드민님!`} navigateOnClick="/admin"/>
      <InputContainer>
        <Gap />
        <CreateSessionForm navigate={navigate} />
      </InputContainer>
    </Container>
  );
};

export default CreateSessionPage;
