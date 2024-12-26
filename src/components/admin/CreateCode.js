import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AdminMainButton,AdminSmallButton  } from "../common/Button";
import {StyledText} from "../common/Text"
import { Container, ContentContainer, InputContainer, HeaderButtonContainer} from "../common/Container";
import { Gap } from "../common/Gap";
import { PageHeader } from "../common/Header";
import { COLORS } from "../../utils/theme";
import { useCreateCode } from "../../viewModel/adminHook";
import { useLogin } from "../../viewModel/loginHook";
import { SessionAttendance } from "./SessionAttendList"
const CreateCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sessionId } = location.state;
  const { code, isStart, createCode, restartCode, endCode } = useCreateCode(sessionId, navigate);
  const { onPressLogout } = useLogin();
  const buttons = [
    {
      label: '로그아웃',
      bgColor: COLORS.orange,
      color: 'black',
      onClick: () => onPressLogout(navigate),
    },
  ];

  // 재시작 버튼 생성
  const renderRestartButtons = () => {
    const buttons = [];
    for (let idx = 0; idx < 3; idx++) {
      buttons.push(
        <AdminSmallButton
          key={`restart-button-${idx}`}
          content={`${idx + 1}번 출석 재시작`}
          onClick={() => restartCode(idx)}
          backgroundColor={COLORS.blue}
        />
      );
    }
    return buttons;
  };

  return (
    <>
      {isStart ? (
        <Container>
          <InputContainer>
          <PageHeader text={`현재 생성된 코드는 ${code} 입니다.`} buttons={buttons}/>
          <ContentContainer>
          <AdminMainButton
            content={"강제 종료"}
            onPress={endCode}
            backgroundColor={COLORS.red}
          />
          </ContentContainer>
          </InputContainer>
        </Container>
      ) : (
        <Container>
          <InputContainer>
          <PageHeader text={`어드민님 반가워요!`} navigateOnClick="/admin" buttons={buttons}/>
          <ContentContainer> 
          <HeaderButtonContainer>
          {renderRestartButtons()}
          </HeaderButtonContainer>
          <StyledText
          content={"세션의 n번째 출석을 초기화하고 다시 시작(실수해서 다시 할때!!)"}
          fontSize={"15"}
          color={COLORS.white}
        />  
          <AdminMainButton content={"코드 생성"} onPress={createCode} />
          <StyledText
          content={"출석체크 시작하면 눌러주시고 출석체크 끝나면 종료 누르세요!!"}
          fontSize={"15"}
          color={COLORS.white}
        />  
          </ContentContainer> 
          </InputContainer>
          <SessionAttendance sessionId = {sessionId} />
        </Container>
      )}
    </>
  );
};

export default CreateCode;
