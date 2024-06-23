import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getSessions } from '../../utils/admin';
import { COLORS } from '../../utils/theme';
import { Header } from '../common/Header';
import Logo from '../common/Logo';
import { StyledText, StyledSubText, FontStyledText } from '../common/Text';


const Container = styled.div`
  padding: 50px;
`;

const SessionItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin: 30px 0;
  border: 1px solid ${COLORS.green};
  border-radius: 5px;
  background-color: ${COLORS.light_gray};
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

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>Error: {error}</Container>;
  }
  const handleSessionClick = (sessionId) => {
    navigate('/createCode', { state: { sessionId } });
  };
  

  return (
    <Container>
      <Logo />
      <Header text={`세션 리스트`} />      
      {sessions.map((session) => (
        <SessionItem key={session._id} onClick={() => handleSessionClick(session._id)}>
          <StyledText content={session.name} fontSize={15} />
          <StyledText content={new Date(session.date).toLocaleDateString()} fontSize={15} />
        </SessionItem>
      ))}
    </Container>
  );
};

export default SessionListPage;
