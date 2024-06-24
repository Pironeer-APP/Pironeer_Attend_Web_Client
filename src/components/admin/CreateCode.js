import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MainButton } from "../common/Button";
import { Container } from "../common/Container";
import Logo from "../common/Logo";
import { Header } from "../common/Header";
import { startAttendCheck, endAttendCheck } from "../../utils/admin";
import { COLORS } from "../../utils/theme";
import { checkAttendStart } from "../../utils/stateCheck";
import { checkAdminState } from "../../utils/stateCheck";

const CreateCode = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sessionId } = location.state;
  const [code, setCode] = useState(
    sessionStorage.getItem("attendanceCode") || null
  );
  const [isStart, setIsStart] = useState(false);

  const createCode = async () => {
    try {
      const response = await startAttendCheck(sessionId);
      console.log("Response from startAttendCheck:", response);
      if (response && response.code) {
        setCode(response.code);
        sessionStorage.setItem('attendanceCode', response.code);
        alert(`Code: ${response.code}`);
        setIsStart(true);
      } else {
        console.error("No code returned from startAttendCheck");
      }
    } catch (error) {
      alert(error);
    }
  };

  const endCode = async () => {
    try {
      await endAttendCheck();
      setCode(null);
      sessionStorage.removeItem('attendanceCode');
      setIsStart(false);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    checkAttendStart(setIsStart);
    checkAdminState(navigate);
  }, []);

  return (
    <Container>
      <Logo />
      <Header text={`반가워요, 어드민님!`} />
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
        <MainButton content={"코드 생성"} onPress={createCode} />
      )}
    </Container>
  );
};

export default CreateCode;
