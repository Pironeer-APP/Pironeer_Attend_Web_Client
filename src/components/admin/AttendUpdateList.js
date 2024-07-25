import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../utils/theme";
import { OnAirCircle } from "../common/OnAirCircle";
import { getLocal } from "../../utils";
import { api } from "../../utils/api";
import { Container } from "../common/Container";
import { AttendanceContainer, SessionContainer, RowContainer, DateContainer, SessionName } from "../AttendList";
import useAttendStore from "../../states/attendStore";
import useListDataStore from "../../states/listDataStore";

const AttendUpdateList = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const { data: attendanceRecords, loading, error, setData, updateData, setLoading, setError} = useListDataStore();
  const { setUpdateAttends } = useAttendStore();

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await api.get(`/user/checkAttendance/${userId}`);
        if (response.data && response.data.attendances) {
          setData(response.data.attendances);
        } else {
          throw new Error("No attendance records found");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchAttendance();
    }
  }, [userId]);

  if (loading) return <Container>Loading...</Container>;
  if (error) return <Container>Error: {error}</Container>;

  const calculateStatus = (attendList) => {
    if (!attendList || attendList.length === 0) return COLORS.light_gray;
    const checkedCount = attendList.filter((item) => item.status).length;
    if (checkedCount === 3) return COLORS.green;
    if (checkedCount >= 1) return COLORS.orange;
    return COLORS.red;
  };

  const toggleAttend = (record_index, attend_index) => {
    const target_record = attendanceRecords[record_index];
    const target_attend = target_record.attendList[attend_index];

    const new_attend = {
      userId: userId,
      sessionId: target_record.session,
      attendIdx: target_attend.attendIdx,
      status: !target_attend.status,
    };

    setUpdateAttends(new_attend);
    updateData((prev) => {
      const newRecords = [...prev];
      newRecords[record_index].attendList[attend_index].status =
        !newRecords[record_index].attendList[attend_index].status;
      return newRecords;
    });
  };

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
