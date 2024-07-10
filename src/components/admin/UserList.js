import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../utils/client";
import styled from "styled-components";
import { COLORS } from "../../utils/theme";
import { Header } from "../common/Header";
import { MainButton } from "../common/Button";
import { StyledText } from "../common/Text";
import { checkAdminState } from "../../utils/stateCheck";
import { Container, InputContainer,TwoButtonContainer } from "../common/Container";

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



const UpdateButton = styled.button`
  background-color: ${COLORS.green};
  color: black;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  margin: 5px 0;
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
          (user) => user.isAdmin === false
        );
        setUsers(filtered_user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    checkAdminState(navigate);
  }, []);

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>Error: {error}</Container>;

  return (
    <Container>
      <Header text={`유저 리스트`} navigateOnClick="/admin"/>
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
            </TwoButtonContainer>
          </UserItem>
        ))}
      </InputContainer>
    </Container>
  );
};

export default UserList;
