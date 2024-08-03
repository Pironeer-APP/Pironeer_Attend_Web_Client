import React from "react";
import CreateCodeButton from "../components/admin/CreateCodeButton";
import { Container } from "../components/common/Container";
import { Header } from "../components/common/Header";
import { useNavigate, useLocation } from "react-router-dom";

const CreateCodePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sessionId } = location.state || {};

  console.log(sessionId);

  return (
    <Container>
      <CreateCodeButton sessionId={sessionId} />
    </Container>
  );
};

export default CreateCodePage;
