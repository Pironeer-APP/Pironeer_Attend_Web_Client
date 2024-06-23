import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getSessions, deleteSession } from '../../utils/admin'; // Import deleteSession function
import { COLORS } from '../../utils/theme';
import { Header } from '../common/Header';
import Logo from '../common/Logo';
import { StyledText, StyledSubText, FontStyledText } from '../common/Text';
import { formatDate } from '../../utils';

const Container = styled.div`
  padding: 50px;
`;

const SessionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; // Center align items vertically
  padding: 20px;
  margin: 30px 0;
  border: 1px solid ${COLORS.green};
  border-radius: 5px;
  background-color: ${COLORS.light_gray};
`;

const DeleteButton = styled.button`
  background-color: ${COLORS.red};
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const SessionListPage = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
    navigate('/createCode', { state: { sessionId } });
  };

  const handleDeleteClick = async (sessionId) => {
    try {
      await deleteSession(sessionId);
      setSessions(sessions.filter(session => session._id !== sessionId));
      alert('세션이 삭제되었습니다.')
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
      <Logo />
      <Header text={`세션 리스트`} />
      {sessions.map((session) => (
        <SessionItem key={session._id}>
          <div onClick={() => handleSessionClick(session._id)}>
            <StyledText content={session.name} fontSize={15} />
            <StyledText content={formatDate(session.date)} fontSize={15} />
          </div>
          <DeleteButton onClick={() => handleDeleteClick(session._id)}>삭제</DeleteButton>
        </SessionItem>
      ))}
    </Container>
  );
};

export default SessionListPage;
