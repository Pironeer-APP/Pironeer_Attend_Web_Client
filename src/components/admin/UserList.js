import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../utils/client";
import styled from "styled-components";
import { COLORS } from "../../utils/theme";
import { Header } from "../common/Header";
import { MainButton } from "../common/Button";
import { StyledText } from "../common/Text";

const Container = styled.div`
  padding: 100px;
`;

const UserItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin: 30px 0;
  border: 1px solid ${COLORS.green};
  border-radius: 5px;
  background-color: ${COLORS.light_gray};
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserField = styled.div`
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const UpdateButton = styled.button`
  background-color: ${COLORS.green};
  color: black;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await client.get("/user/users");
        const filtered_user = response.data.filter(
          (user) => user.isAdmin == false
        );
        setUsers(filtered_user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>Error: {error}</Container>;

  return (
    <Container>
      <Header text={`유저 리스트`} />
      {users.map((user) => (
        <UserItem key={user?._id}>
          <UserDetails>
            <UserField>
              <StyledText
                content={user?.isAdmin ? "어드민" : "일반 유저"}
                fontSize={15}
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
            <UserField>
              <StyledText
                content={`비밀번호: ${user?.password}`}
                fontSize={10}
              />
            </UserField>
          </UserDetails>
          <ButtonContainer>
            <UpdateButton
              onClick={() =>
                navigate("/updateUser", { state: { userId: user?._id } })
              }
            >
              정보 변경
            </UpdateButton>
            <UpdateButton
              onClick={() => {
                navigate("/checkAttend", { state: { userId: user._id } });
              }}
            >
              출석 내역
            </UpdateButton>
          </ButtonContainer>
        </UserItem>
      ))}
    </Container>
  );
};

export default UserList;
