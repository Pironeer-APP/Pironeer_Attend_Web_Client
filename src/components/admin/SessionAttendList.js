import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../utils/theme";
import { OnAirCircle } from "../common/OnAirCircle";
import { getLocal } from "../../utils/date";
import { getSessionAttendance } from "../../viewModel/adminHook";

// 스타일 정의
const AttendanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  justify-content: center;
  align-items: center;
  max-width: 600px;
`;

const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  width: 100%;
`;

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 14px;
  color: ${COLORS.textColor};
`;

const SessionName = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const SessionAttendance = ({ sessionId }) => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 출석 상태 계산 함수
  const calculateStatus = (attendList) => {
    if (!attendList || attendList.length === 0) return COLORS.light_gray;
    const checkedCount = attendList.filter((item) => item.status).length;
    if (checkedCount === attendList.length) return COLORS.green;
    if (checkedCount >= 1) return COLORS.orange;
    return COLORS.red;
  };

  // 데이터 로드
  useEffect(() => {
    const loadAttendanceData = async () => {
      try {
        setLoading(true);
        const data = await getSessionAttendance(sessionId);
        if (data && data.attends) {
          setAttendanceRecords(data.attends);
        } else {
          setError("No data found for this session.");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch attendance data.");
      } finally {
        setLoading(false);
      }
    };

    loadAttendanceData();
  }, [sessionId]);

  if (loading) return <AttendanceContainer>Loading...</AttendanceContainer>;
  if (error) return <AttendanceContainer>Error: {error}</AttendanceContainer>;

  return (
    <AttendanceContainer>
      {attendanceRecords.map((record, index) => {
        const { userName, attendList } = record;
        const finalStatus = calculateStatus(attendList);
        const attendListLength = attendList ? attendList.length : 0;
        const grayCirclesNeeded = 3 - attendListLength;

        return (
          <SessionContainer key={index}>
            <SessionName>{userName}</SessionName>
            <RowContainer>
              <OnAirCircle color={finalStatus} />
              {attendList &&
                attendList.map((attend, i) => (
                  <OnAirCircle
                    key={attend._id}
                    color={attend.status ? COLORS.green : COLORS.red}
                  />
                ))}
              {[...Array(grayCirclesNeeded)].map((_, i) => (
                <OnAirCircle
                  key={`gray-${i}`}
                  color={COLORS.light_gray}
                />
              ))}
            </RowContainer>
          </SessionContainer>
        );
      })}
    </AttendanceContainer>
  );
};

export {SessionAttendance};