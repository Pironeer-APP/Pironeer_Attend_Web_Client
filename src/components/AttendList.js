import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS } from '../utils/theme';
import OnAirCircle from './common/OnAirCircle';
import { checkAttendance } from '../utils';
import { getLocal } from '../utils';

const AttendanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  align-items: center;
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

const AttendList = ({ userId }) => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await checkAttendance(userId);
        console.log('Attendance Response:', response.data); // Log the full response data
        if (response.data && response.data.attend) {
          setAttendanceRecords(response.data.attend);
        } else {
          throw new Error('No attendance records found');
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
    const checkedCount = attendList.filter(item => item.status).length;
    if (checkedCount === 3) return COLORS.green;
    if (checkedCount >= 1) return COLORS.orange;
    return COLORS.red;
  };

  return (
    <AttendanceContainer>
      {attendanceRecords.map((record, index) => {
        const { month, date, day } = getLocal(record.session.date);
        const finalStatus = calculateStatus(record.attendList);

        return (
          <RowContainer key={index}>
            <OnAirCircle color={finalStatus} />
            <DateContainer>
              {month}/{date}
              <br />
              {day}
            </DateContainer>
            {record.attendList && record.attendList.length > 0
              ? record.attendList.map((attend, i) => (
                <OnAirCircle key={i} color={attend.status ? COLORS.green : COLORS.red} />
              ))
              : [0, 1, 2].map(i => ( 
                <OnAirCircle key={i} color={COLORS.light_gray} />
              ))}
          </RowContainer>
        );
      })}
    </AttendanceContainer>
  );
};

export default AttendList;
