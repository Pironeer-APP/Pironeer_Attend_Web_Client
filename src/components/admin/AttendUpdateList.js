import React from "react";
import { useLocation } from "react-router-dom";
import { COLORS } from "../../utils/theme";
import { OnAirCircle } from "../common/OnAirCircle";
import { getLocal } from "../../utils/date";
import { Container } from "../common/Container";
import { AttendanceContainer, SessionContainer, RowContainer, DateContainer, SessionName } from "../user/AttendList";
import useAttendStore from "../../states/attendStore";
import { useAttendUpdate } from "../../viewModel/adminHook";
import useListDataStore from '../../states/listDataStore';
import { useAttendUpdateList } from "../../viewModel/adminHook";

const AttendUpdateList = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const { attendanceRecords, loading, error, toggleAttend } = useAttendUpdateList(userId);
  const calculateStatus = (attendList) => {
    if (!attendList || attendList.length === 0) return COLORS.light_gray;
    const checkedCount = attendList.filter((item) => item.status).length;
    if (checkedCount === 3) return COLORS.green;
    if (checkedCount >= 1) return COLORS.orange;
    return COLORS.red;
  };

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>Error: {error}</Container>;

  return (
    <AttendanceContainer>
      {attendanceRecords.map((record, record_index) => {
        if (!record.session_date) {
          return null;
        }

        const { month, date, day } = getLocal(record.session_date);
        const finalStatus = calculateStatus(record.attendList);
        const attendListLength = record.attendList ? record.attendList.length : 0;
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
