import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getSessions, deleteSession } from "../../utils/admin"; // Import deleteSession function
import { COLORS } from "../../utils/theme";
import { Header } from "../common/Header";
import { StyledText } from "../common/Text";
import { formatDate } from "../../utils";
import { checkAdminState } from "../../utils/authentication";
import { Container, InputContainer } from "../common/Container";
import useListDataStore from "../../store/listDataStore";

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

const SessionListPage = () => {
  const navigate = useNavigate();
  const { data: sessions, loading, error, setData, setLoading, setError } = useListDataStore();

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      try {
        const data = await getSessions();
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
    checkAdminState(navigate);
  }, [navigate, setData, setLoading, setError]);

  const handleSessionClick = (sessionId) => {
    navigate("/createCode", { state: { sessionId } });
  };

  const handleDeleteClick = async (sessionId) => {
    try {
      await deleteSession(sessionId);
      setData(sessions.filter((session) => session._id !== sessionId));
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
    <Container>
      <Header text={`세션 리스트`} navigateOnClick="/admin"/>
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
    </Container>
  );
};

export default SessionListPage;
