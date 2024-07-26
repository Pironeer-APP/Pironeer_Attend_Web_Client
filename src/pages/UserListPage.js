import React from "react";
import { Header } from "../components/common/Header";
import { Container } from "../components/common/Container";
import UserList from "../components/admin/UserList";

const UserListPage = () => {
  return (
    <Container>
      <Header text={`유저 리스트`} navigateOnClick="/admin" />
      <UserList />
    </Container>
  );
};

export default UserListPage;
