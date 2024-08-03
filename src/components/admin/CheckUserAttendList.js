import React, { useState } from "react";
import { client } from "../../utils/client";
import { MainButton } from "../../components/common/Button";
import AttendUpdateList from "./AttendUpdateList";
import { Gap } from "../common/Gap";
import useUserStore from "../../store/userStore";

const UpdateUser = ({ userId }) => {
  const [updateAttends, setUpdateAttends] = useState([]);
  const { user } = useUserStore();

  const handleUpdateAttendance = async () => {
    const updateUserAttendance = async (update_info) =>
      await client.put(`/user/users/${userId}/attendance`, user.token, {
        userId: update_info.userId,
        sessionId: update_info.sessionId,
        attendIdx: update_info.attendIdx,
        status: update_info.status,
      });

    // 업데이트는 하나의 출석 정보만 가능함.
    // updateAttends에 모든 출석 정보를 넣어서 map 함수로 한명씩 업데이트
    try {
      // 240727 연우: Promise.all을 사용하여 하나라도 오류 발생시 바로 로직 실패처리할 수 있도록 수정
      const results = await Promise.all(
        updateAttends.map((update_info) => updateUserAttendance(update_info))
      );

      const allSuccess = results.every((response) => response.status === 200);

      if (allSuccess) {
        alert("출석 정보가 변경되었습니다.");
      } else {
        alert("일부 출석 정보 변경에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("출석 정보 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <MainButton
        content={"출석 정보 변경하기"}
        onPress={handleUpdateAttendance}
      />
      <Gap />
      <AttendUpdateList
        setUpdateAttends={setUpdateAttends}
        updateAttends={updateAttends}
        userId={userId}
      />
    </>
  );
};

export default UpdateUser;
