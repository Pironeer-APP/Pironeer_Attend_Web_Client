import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MainButton } from "../common/Button";
import { Container } from "../common/Container";
import { Header } from "../common/Header";
import { COLORS } from "../../utils/theme";
import { useCreateCode } from "../../viewModel/adminHook";

const CreateCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sessionId } = location.state;
  const { code, isStart, createCode, endCode } = useCreateCode(sessionId, navigate);

  return (
    <Container>
      {isStart ? (
        <>
          <Header text={`현재 생성된 코드는 ${code} 입니다.`} />
          <MainButton
            content={"강제 종료"}
            onPress={endCode}
            backgroundColor={COLORS.red}
          />
        </>
      ) : (
        <>
          <Header text={`반가워요, 어드민님!`} navigateOnClick="/admin" />
          <MainButton content={"코드 생성"} onPress={createCode} />
        </>
      )}
    </Container>
  );
};

export default CreateCode;
