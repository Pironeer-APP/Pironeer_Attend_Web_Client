import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { api } from "../../utils/api";
import { COLORS } from "../../utils/theme";
import { PageHeader } from "../common/Header";
import { SmallButton } from "../common/Button";
import { StyledText } from "../common/Text";
import { checkAdminState } from "../../utils/authentication";
import { Container, ContentContainer, InputContainer, TwoButtonContainer } from "../common/Container";
import useListDataStore from "../../states/listDataStore";
import { useUserList } from "../../viewModel/adminHook";
import { ItemBox } from "../common/Box";

const UserItemBox = ({ user }) => {
  const navigate = useNavigate();

  const userDetails = [
    { content: user?.isAdmin ? "어드민" : "일반 유저", fontSize: 15, weight: 500 },
    { content: `아이디: ${user?._id}`, fontSize: 10 },
    { content: `이름: ${user?.username}`, fontSize: 10 },
    { content: `이메일: ${user?.email}`, fontSize: 10 },
  ];

  const userActions = [
    { content: "정보 변경", onClick: () => navigate("/updateUser", { state: { userId: user?._id } }) },
    { content: "출석 내역", onClick: () => navigate("/checkAttend", { state: { userId: user._id } }) },
  ];

  return <ItemBox item={user} itemDetails={userDetails} itemActions={userActions} />;
};

const UserList = () => {
  const { users, loading, error } = useUserList();
  const buttons = [
    {
      label: '로그아웃',
      bgColor: COLORS.orange,
      color: 'black',
      onClick: () => alert('로그아웃 clicked'),
    },
  ];

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>Error: {error}</Container>;

  return (
    <Container>
      <PageHeader text={`유저 리스트`} navigateOnClick="/admin" buttons={buttons}/>
      <ContentContainer>
        <InputContainer>
          {users.map((user) => (
            <UserItemBox key={user?._id} user={user} />
          ))}
        </InputContainer>
      </ContentContainer>
    </Container>
  );
};

export default UserList;
