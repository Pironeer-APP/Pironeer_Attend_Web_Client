import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../../utils/theme";
import { Header } from "../common/Header";
import { StyledText } from "../common/Text";
import { formatDate } from "../../utils";
import { Container, InputContainer } from "../common/Container";
import { useSessionList } from "../../viewModel/adminHook";

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
  const { sessions, loading, error, handleDeleteClick } = useSessionList(navigate);

  const handleSessionClick = (sessionId) => {
    navigate("/createCode", { state: { sessionId } });
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
