import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MainButton } from "../common/Button";
import { Container, ContentContainer, InputContainer } from "../common/Container";
import { PageHeader } from "../common/Header";
import { COLORS } from "../../utils/theme";
import { useCreateCode } from "../../viewModel/adminHook";
import { useLogin } from "../../viewModel/loginHook";
const CreateCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sessionId } = location.state;
  const { code, isStart, createCode, endCode } = useCreateCode(sessionId, navigate);
  const { onPressLogout } = useLogin();
  const buttons = [
    {
      label: '로그아웃',
      bgColor: COLORS.orange,
      color: 'black',
      onClick: () => onPressLogout(navigate),
    },
  ];
  return (
    <>
      {isStart ? (
        <Container>
          <PageHeader text={`현재 생성된 코드는 ${code} 입니다.`} buttons={buttons}/>
          <ContentContainer>
          <InputContainer>
          <MainButton
            content={"강제 종료"}
            onPress={endCode}
            backgroundColor={COLORS.red}
          />
          </InputContainer>
          
          </ContentContainer>
        </Container>
      ) : (
        <Container>
          <PageHeader text={`어드민님 반가워요!`} navigateOnClick="/admin" buttons={buttons}/>
          <ContentContainer>
          <InputContainer>
          <MainButton content={"코드 생성"} onPress={createCode} />
          </InputContainer>
          </ContentContainer>
        </Container>
      )}
    </>
  );
};

export default CreateCode;
