import { api } from "../utils/api";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkUserState, checkAttendStart } from '../utils/authentication';
import { COLORS } from '../utils/theme';
function useAttend() {
    const [pin, setPin] = useState("");
    const [warning, setWarning] = useState("");
  
    const onChangePin = (value) => {
      setPin(value);
    };
  
    const onPressAttend = async (navigate, setIsAttend) => {
      const userId = sessionStorage.getItem("id");
  
      // 숫자가 아닌 경우 경고
      if (isNaN(pin)) {
        setPin("");
        setWarning("출석 코드는 0~9의 숫자로 이루어져야 합니다.");
        return;
      }
      // 네자리가 아닌 경우 경고
      if (pin.length !== 4) {
        setPin("");
        setWarning("출석코드는 4자리 숫자로 이루어져야 합니다.");
        return;
      }
      // 정상 입력된 경우 기존의 경고 삭제
      setWarning("");
  
      // 서버에 출석 정보 전달
      try {
        const endpoint = `/session/checkAttend/${userId}`;
        const body = { code: pin };
  
        const response = await api.post(endpoint, body);
        
        if (response.status === 201) {
          setIsAttend(true);
        }
        setWarning(response.message);
      }  catch (error) {
        setWarning(error);
      }
      setPin("");
    };
  
    return {
      pin,
      warning,
      onChangePin,
      onPressAttend,
    };
  }
  const useAttendList = (userId) => {
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
    return { attendanceRecords, calculateStatus };
  
  };
const useUserCheckPage = () => {
  const navigate = useNavigate();
  const [isStart, setIsStart] = useState(false);
  const [isAttend, setIsAttend] = useState(false); // 출석코드 입력 여부
  const userId = sessionStorage.getItem("id");
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    }
  }, [userId, navigate]);

  // Polling checkAttendStart every second if not attended
  useEffect(() => {
    if (!isAttend) {
      checkAttendStart(setIsStart);
    }
  }, [isAttend]);

  // 출석 체크가 시작되었고, 현재 유저가 출석하지 않았다면 출석 창 보여주기
  // 출석 완료되었다면 완료 창 보여주기
  // 출석 기간이 아니면 Attend List만
  useEffect(() => {
    checkUserState(navigate);
    checkAttendStart(setIsStart);
  }, []);
  useEffect(() => {
    if (isAttend) {
      alert("출석에 성공하였습니다!");
    }
  }, [isAttend]);
  return { isStart, isAttend, setIsAttend, userId, username };
};
export { useAttend, useAttendList, useUserCheckPage };