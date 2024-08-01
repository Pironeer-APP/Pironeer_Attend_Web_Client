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

const UserItem = styled.div`
  display: flex;
  width: calc(100% - 40px);
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border: 1px solid ${COLORS.green};
  border-radius: 5px;
  background-color: ${COLORS.black};
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserField = styled.div`
  margin-bottom: 10px;
`;



const UserList = () => {
  const navigate = useNavigate();
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
          <UserItem key={user?._id}>
            <UserDetails>
              <UserField>
                <StyledText
                  content={user?.isAdmin ? "어드민" : "일반 유저"}
                  fontSize={15}
                  weight={500}
                />
              </UserField>
              <UserField>
                <StyledText content={`아이디: ${user?._id}`} fontSize={10} />
              </UserField>
              <UserField>
                <StyledText content={`이름: ${user?.username}`} fontSize={10} />
              </UserField>
              <UserField>
                <StyledText content={`이메일: ${user?.email}`} fontSize={10} />
              </UserField>
            </UserDetails>
            <TwoButtonContainer>
              <SmallButton
                content={"정보 변경"}
                onClick={() =>
                  navigate("/updateUser", { state: { userId: user?._id } })
                }
              />
              <SmallButton
                content={"출석 내역"}
                onClick={() => {
                  navigate("/checkAttend", { state: { userId: user._id } });
                }}
              />
            </TwoButtonContainer>
          </UserItem>
        ))}
      </InputContainer>
      </ContentContainer>
    </Container>
  );
};

export default UserList;
