import React, { useState, useEffect } from "react";
import { MainButton } from "../common/Button";
import { client } from "../../utils/client";
import { Header } from "../common/Header";
import { COLORS } from "../../utils/theme";
import { checkAttendStart } from "../../utils/authentication";
import useUserStore from "../../store/userStore";

const CreateCode = ({ sessionId }) => {
  const { user } = useUserStore();

  const [code, setCode] = useState(
    sessionStorage.getItem("attendanceCode") || null
  );
  const [isStart, setIsStart] = useState(false);

  console.log(sessionId);

  const startAttendCheck = async (sessionId) => {
    try {
      console.log(`Starting attendance check for session ID: ${sessionId}`);
      const response = await client.post(
        `/session/startAttendCheck/${sessionId}`,
        user.token
      );
      return response.data;
    } catch (error) {
      console.error("Error starting attendance check:", error);
      throw error;
    }
  };

  const createCode = async () => {
    try {
      const response = await startAttendCheck(sessionId);
      console.log("Response from startAttendCheck:", response);
      if (response && response.code) {
        setCode(response.code);
        sessionStorage.setItem("attendanceCode", response.code);
        alert(`Code: ${response.code}`);
        setIsStart(true);
      } else {
        console.error("No code returned from startAttendCheck");
      }
    } catch (error) {
      alert(error);
    }
  };

  const endAttendCheck = async () => {
    try {
      const response = await client.delete(
        "/session/endAttendCheck",
        user.token
      );
      return response.data;
    } catch (error) {
      console.error("Error ending attendance check:", error);
      throw error;
    }
  };

  const endCode = async () => {
    try {
      await endAttendCheck();
      setCode(null);
      sessionStorage.removeItem("attendanceCode");
      setIsStart(false);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    checkAttendStart(setIsStart, user.token);
  }, []);

  return isStart ? (
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
      <MainButton content={"코드 생성"} onPress={createCode} />
    </>
  );
};

export default CreateCode;
