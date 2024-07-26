import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, InputContainer } from "../components/common/Container";
import { Header } from "../components/common/Header";
import { Gap } from "../components/common/Gap";
import UpdateUserForm from "../components/admin/UpdateUserForm";

const UpdateUser = () => {
  const location = useLocation();
  const { userId } = location.state || {};

  return (
    <Container>
      <Header text={`유저 정보 변경`} navigateOnClick="/admin" />
      <Gap />
      <UpdateUserForm userId={userId} />
    </Container>
  );
};

export default UpdateUser;
