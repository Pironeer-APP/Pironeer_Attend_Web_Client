// //component of UserCheckPage
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../utils/theme";
import { OnAirCircle } from "./common/OnAirCircle";
import { getLocal } from "../utils";
import { api } from "../utils/api";

const AttendanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  justify-content: center;
  align-items: center;
  max-width: 300px;
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

const AttendList = ({ userId }) => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await api.get(`/user/checkAttendance/${userId}`);
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

  return (
    <AttendanceContainer>
      {attendanceRecords.map((record, index) => {
        if (!record.session_date) {
          return null;
        }

        const { month, date, day } = getLocal(record.session_date);
        const finalStatus = calculateStatus(record.attendList);
        const attendListLength = record.attendList
          ? record.attendList.length
          : 0;
        const grayCirclesNeeded = 3 - attendListLength;

        return (
          <SessionContainer key={index}>
            <SessionName>{record.session_name}</SessionName>
            <RowContainer>
              <OnAirCircle color={finalStatus} />
              <DateContainer>
              {month}/{date}
                <br />
                {day }
              </DateContainer>
              {record.attendList && record.attendList.length > 0
                ? record.attendList.map((attend, i) => (
                    <OnAirCircle
                      key={i}
                      color={attend.status ? COLORS.green : COLORS.red}
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

export default AttendList;
export {
  AttendanceContainer,
  SessionContainer,
  RowContainer,
  DateContainer,
  SessionName
}