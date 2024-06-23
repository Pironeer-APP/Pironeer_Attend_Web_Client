import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getSessions } from '../../utils/admin';
import { COLORS } from '../../utils/theme';
import { Header } from '../common/Header';
import Logo from '../common/Logo';

const Container = styled.div`
  padding: 20px;
`;

const SessionItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid ${COLORS.light_gray};
  border-radius: 5px;
  background-color: ${COLORS.gray};
`;

const SessionListPage = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <Container>
      <Logo />
      <Header text={`세션 리스트`} />      
      {sessions.map((session) => (
        <SessionItem key={session._id}>
          <span>{session.name}</span>
          <span>{new Date(session.date).toLocaleDateString()}</span>
        </SessionItem>
      ))}
    </Container>
  );
};

export default SessionListPage;
