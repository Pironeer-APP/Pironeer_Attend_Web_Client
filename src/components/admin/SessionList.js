import React from "react";
import styled from "styled-components";
import { COLORS } from "../../utils/theme";
import { PageHeader } from "../common/Header";
import { StyledText } from "../common/Text";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/date";
import { Container, ContentContainer, InputContainer } from "../common/Container";
import { SmallButton } from "../common/Button";
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
  const { sessions, loading, error, handleDeleteClick } = useSessionList();

  const buttons = [
    {
      label: '로그아웃',
      bgColor: COLORS.orange,
      color: 'black',
      onClick: () => alert('로그아웃 clicked'),
    },
  ];

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
      <PageHeader text={`세션 리스트`} navigateOnClick="/admin" buttons={buttons}/>
      <ContentContainer>
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
            <SmallButton 
            content={"삭제"}
            backgroundColor={COLORS.red}
            color={'white'}
            onClick={() => handleDeleteClick(session._id)}
            />
          </SessionItem>
        ))}
      </InputContainer>
      </ContentContainer>
    </Container>
  );
};

export default SessionListPage;
