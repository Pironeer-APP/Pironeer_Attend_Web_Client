import React from "react";
import CreateCodeButton from "../components/admin/CreateCodeButton";
import { Container } from "../components/common/Container";
import { Header } from "../components/common/Header";
import { useNavigate, useLocation } from "react-router-dom";

const CreateCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sessionId } = location.state;

  console.log(location.state);

  return (
    <Container>
      <Header text={`반가워요, 어드민님!`} navigateOnClick="/admin" />
      <CreateCodeButton sessionId={sessionId} />
    </Container>
  );
};

export default CreateCode;
