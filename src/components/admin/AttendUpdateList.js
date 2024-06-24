import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../utils/theme";
import OnAirCircle from "../common/OnAirCircle";
import { getLocal } from "../../utils";
import { client } from "../../utils/client";

const AttendanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  align-items: center;
`;

const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

const RowContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const DateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${COLORS.textColor};
`;

const SessionName = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const AttendUpdateList = ({ userId, setUpdateAttends, updateAttends }) => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await client.get(`/user/checkAttendance/${userId}`);
        console.log("Attendance Response:", response.data);
        if (response.data && response.data.attendances) {
          setAttendanceRecords(response.data.attendances);
        } else {
          throw new Error("No attendance records found");
        }
      } catch (error) {
        console.error("Error fetching attendance records:", error.message);
      }
    };

    if (userId) {
      fetchAttendance();
    }
  }, [userId]);

  const calculateStatus = (attendList) => {
    if (!attendList || attendList.length === 0) return COLORS.light_gray;
    const checkedCount = attendList.filter((item) => item.status).length;
    if (checkedCount === 3) return COLORS.green;
    if (checkedCount >= 1) return COLORS.orange;
    return COLORS.red;
  };

  const toggleAttend = (record_index, attend_index) => {
    const target_record = attendanceRecords[record_index];
    const target_attend =
      attendanceRecords[record_index].attendList[attend_index];

    const new_attend = {
      userId: userId,
      sessionId: target_record.session,
      attendIdx: target_attend.attendIdx,
      status: !target_attend.status,
    };

    // 중복 클릭 여부 확인
    setUpdateAttends((prev) => {
      console.log(prev);
      return prev.filter(
        (attend) =>
          attend.userId !== new_attend.userId ||
          attend.sessionId !== new_attend.sessionId ||
          attend.attendIdx !== new_attend.attendIdx
      );
    });
    setUpdateAttends((prev) => [...prev, new_attend]);
    setAttendanceRecords((prev) => {
      const newRecords = [...prev];
      newRecords[record_index].attendList[attend_index].status =
        !newRecords[record_index].attendList[attend_index].status;
      return newRecords;
    });
  };

  return (
    <AttendanceContainer>
      {attendanceRecords.map((record, record_index) => {
        const { month, date, day } = getLocal(record.session_date);
        const finalStatus = calculateStatus(record.attendList);
        const attendListLength = record.attendList
          ? record.attendList.length
          : 0;
        const grayCirclesNeeded = 3 - attendListLength;

        return (
          <SessionContainer key={record_index}>
            <SessionName>{record.session_name}</SessionName>
            <RowContainer>
              <OnAirCircle color={finalStatus} />
              <DateContainer>
                {month}/{date}
                <br />
                {day}
              </DateContainer>
              {record.attendList && record.attendList.length > 0
                ? record.attendList.map((attend, attend_index) => (
                    <OnAirCircle
                      key={attend_index}
                      color={attend.status ? COLORS.green : COLORS.red}
                      onPress={() => toggleAttend(record_index, attend_index)}
                    />
                  ))
                : null}
              {[...Array(grayCirclesNeeded)].map((_, i) => (
                <OnAirCircle
                  key={attendListLength + i}
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

export default AttendUpdateList;
