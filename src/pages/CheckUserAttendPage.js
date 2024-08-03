import React from "react";
import { useLocation } from "react-router-dom";
import { Header } from "../components/common/Header";
import { Container } from "../components/common/Container";
import CheckUserAttendList from "../components/admin/CheckUserAttendList";

const UpdateUser = () => {
  const location = useLocation();
  const { userId } = location.state || {};

  return (
    <Container>
      <Header text={`반가워요, 어드민님!`} navigateOnClick="/admin" />
      <CheckUserAttendList userId={userId} />
    </Container>
  );
};

export default UpdateUser;
