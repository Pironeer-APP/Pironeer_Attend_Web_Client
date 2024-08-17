import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MainButton } from "../common/Button";
import { Container } from "../common/Container";
import { PageHeader } from "../common/Header";
import { COLORS } from "../../utils/theme";
import { useCreateCode } from "../../viewModel/adminHook";

const CreateCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sessionId } = location.state;
  const { code, isStart, createCode, endCode } = useCreateCode(sessionId, navigate);
  const buttons = [
    {
      label: '로그아웃',
      bgColor: COLORS.orange,
      color: 'black',
      onClick: () => alert('로그아웃 clicked'),
    },
  ];
  return (
    <Container>
      {isStart ? (
        <>
          <PageHeader text={`현재 생성된 코드는 ${code} 입니다.`} buttons={buttons}/>
          <MainButton
            content={"강제 종료"}
            onPress={endCode}
            backgroundColor={COLORS.red}
          />
        </>
      ) : (
        <>
          <PageHeader text={`어드민님 반가워요!`} navigateOnClick="/admin" buttons={buttons}/>
          <MainButton content={"코드 생성"} onPress={createCode} />
        </>
      )}
    </Container>
  );
};

export default CreateCode;
