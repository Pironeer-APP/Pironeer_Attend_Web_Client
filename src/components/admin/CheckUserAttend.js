// UserList.js
import React, { useEffect, useState } from "react";
import { client } from "../../utils/client";
import styled from "styled-components";
import { COLORS } from "../../utils/theme";
import { Header } from "../common/Header";
import { MainButton } from "../common/Button";
import { useNavigate } from "react-router-dom";

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

const CheckUserAttend = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, []);

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>Error: {error}</Container>;

  return (
    <Container>
      <Header text={`유저 리스트`} />
      {users.map((user) => (
        <UserItem key={user._id}>
          <UserDetails>
            <UserField>UserID: {user._id}</UserField>
            <UserField>Username: {user.username}</UserField>
            <UserField>Email: {user.email}</UserField>
            <UserField>Password: {user.password}</UserField>
            <UserField>Is Admin: {user.isAdmin ? "Yes" : "No"}</UserField>
          </UserDetails>
          <MainButton
            content={"출석 내역"}
            onPress={() => navigate(`checkAttend/${user._id}`)}
          />
        </UserItem>
      ))}
    </Container>
  );
};

export default CheckUserAttend;
