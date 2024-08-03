import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../utils/theme";
import { StyledText } from "../common/Text";
import { formatDate } from "../../utils";
import { Container, InputContainer } from "../common/Container";
import { client } from "../../utils/client";
import useUserStore from "../../store/userStore";

const SessionItem = styled.div`
  display: flex;
  width: calc(100% - 40px);
  justify-content: space-between;
  align-items: center; // Center align items vertically
  padding: 20px;
  border: 1px solid ${COLORS.green};
  border-radius: 5px;
  background-color: ${COLORS.black};
`;

const DeleteButton = styled.button`
  background-color: ${COLORS.red};
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const SessionDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const SessionName = styled.div`
  margin-bottom: 10px;
`;

const SessionList = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUserStore();
  const navigate = useNavigate();

  const getSessions = async () => {
    try {
      console.log(user.id);
      const response = await client.get("/session/sessions", user.token);

      if (Array.isArray(response.data)) {
        console.log("sessions fetched:", response.data);
        return response.data;
      } else {
        console.error("Unexpected response format:", response.data);
        return [];
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
      throw error;
    }
  };

  const deleteSession = async (sessionId, token) => {
    const response = await client.delete(
      `/session/deleteSession/${sessionId}`,
      user.token
    );
    console.log("session deleted", response);

    return response.data;
  };

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await getSessions();
        setSessions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const handleSessionClick = (sessionId) => {
    navigate("/createCode", { state: { sessionId } });
  };

  const handleDeleteClick = async (sessionId) => {
    try {
      await deleteSession(sessionId);
      setSessions(sessions.filter((session) => session._id !== sessionId));
      alert("세션이 삭제되었습니다.");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>Error: {error}</Container>;
  }

  return (
    <InputContainer>
      {sessions.map((session) => (
        <SessionItem key={session._id}>
          <SessionDetails onClick={() => handleSessionClick(session._id)}>
            <SessionName>
              <StyledText content={session.name} fontSize={15} weight={500} />
            </SessionName>
            <StyledText
              content={formatDate(session.date)}
              fontSize={12}
              weight={200}
            />
          </SessionDetails>
          <DeleteButton onClick={() => handleDeleteClick(session._id)}>
            삭제
          </DeleteButton>
        </SessionItem>
      ))}
    </InputContainer>
  );
};

export default SessionList;
