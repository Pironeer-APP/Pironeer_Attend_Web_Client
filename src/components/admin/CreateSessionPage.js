import React, { useState, useEffect } from "react";
import { COLORS } from "../../utils/theme";
import { Container, ContentContainer, InputContainer } from "../common/Container";
import { checkAttendStart } from "../../utils/authentication";
import { PageHeader } from "../common/Header";
import { useNavigate } from "react-router-dom";
import { checkAdminState } from "../../utils/authentication";
import {Gap} from "../common/Gap";
import {CreateSessionForm} from "./CreateSessionForm";

import { useLogin } from "../../viewModel/loginHook";


const CreateSessionPage = () => {
  const [isStart, setIsStart] = useState(true);
  const navigate = useNavigate();
  const { onPressLogout } = useLogin();
  const buttons = [
    {
      label: '로그아웃',
      bgColor: COLORS.orange,
      color: 'black',
      onClick: () => onPressLogout(navigate),
    },
  ];

  useEffect(() => {
    checkAttendStart(setIsStart);
    checkAdminState(navigate);
  }, [navigate]);

  return (
    <Container>
      <PageHeader text={`어드민님 반가워요!`} navigateOnClick="/admin" buttons={buttons}/>
      <ContentContainer>
      <InputContainer>
        <Gap />
        {isStart ? (
          <CreateSessionForm navigate={navigate} />
        ) : (
          <CreateSessionForm navigate={navigate} />
        )}
      </InputContainer>
      </ContentContainer>
    </Container>
  );
};

export default CreateSessionPage;
