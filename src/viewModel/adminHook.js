import { api } from '../utils/api';
import { useState,useEffect } from 'react';
import useListDataStore from '../states/listDataStore';
import useAttendStore from '../states/attendStore';
import { checkAdminState, checkAttendStart} from '../utils/authentication';


export const createSession = async (sessionName, date) => {
  try {
    const response = await api.post('/session/createSession', {
      name: sessionName,
      date: date
    });
    console.log("session created", response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
};
function useCreateSession(onSuccess) {
  const [sessionName, setSessionName] = useState("");
  const [date, setDate] = useState("");

  const onChangeSessionName = (value) => {
    setSessionName(value);
  };

  const onChangeDate = (value) => {
    setDate(value);
  };

  const onPressCreateSession = async () => {
    try {
      const formattedDate = new Date(date).toISOString();
      console.log("Formatted Date:", formattedDate);
      await createSession(sessionName, formattedDate);
      alert(`새로운 세션이 생성되었습니다.`);
      onSuccess();
    } catch (error) {
      console.error("Failed to create session:", error);
    }
  };

  return {
    sessionName,
    date,
    onChangeSessionName,
    onChangeDate,
    onPressCreateSession,
  };
}
export const getSessions = async () => {
    try {
      const response = await api.get('/session/sessions');
  
      if (Array.isArray(response.data)) {
        console.log("sessions fetched:", response.data); 
        return response.data;
      } else {
        console.error('Unexpected response format:', response.data);
        return [];
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
      throw error;
    }
  };
  
  export const startAttendCheck = async (sessionId) => {
    try {
      console.log(`Starting attendance check for session ID: ${sessionId}`); 
      const response = await api.post(`/session/startAttendCheck/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error('Error starting attendance check:', error);
      throw error;
    }
  };
  
  export const endAttendCheck = async () => {
    try {
      const response = await api.delete('/session/endAttendCheck');
      return response.data;
    } catch (error) {
      console.error('Error ending attendance check:', error);
      throw error;
    }
  };
  export const deleteSession = async (sessionId) => {
    const response = await api.delete(`/session/deleteSession/${sessionId}`);
    console.log("session deleted", response);
    
    return response.data;
  };


//AttendUpdateList.js  
  const useAttendUpdate = (userId) => {
    const { data: attendanceRecords, loading, error, setData, setLoading, setError } = useListDataStore();
    
    useEffect(() => {
      const fetchAttendance = async () => {
        setLoading(true);
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
    }, [userId, setLoading, setData, setError]);
  
    return { attendanceRecords, loading, error };
  };

//CheckUserAttend.js
const useCheckUserAttend = (userId, navigate) => {
  const { attends: updateAttends } = useAttendStore();
  const [isSuccess, setIsSuccess] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      console.error("User ID is not provided");
      return;
    }
    checkAdminState(navigate);
  }, [userId, navigate]);

  const handleUpdateAttendance = async () => {
    const updateUserAttendance = async (update_info) =>
      await api.put(`/user/users/${userId}/attendance`, {
        userId: update_info.userId,
        sessionId: update_info.sessionId,
        attendIdx: update_info.attendIdx,
        status: update_info.status,
      });

    try {
      let isSuccess = true;
      for (const update_info of updateAttends) {
        const response = await updateUserAttendance(update_info);
        if (response.status === 200) {
          console.log(update_info);
        } else {
          isSuccess = false;
        }
      }
      setIsSuccess(isSuccess);
      if (isSuccess) {
        alert("출석 정보가 변경되었습니다.");
      } else {
        alert("출석 정보 변경에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("Failed to update user:", error);
      setError(error);
      alert("출석 정보 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return { handleUpdateAttendance, isSuccess, error };
};

//CreateCode.js


const useCreateCode = (sessionId, navigate) => {
  const [code, setCode] = useState(sessionStorage.getItem("attendanceCode") || null);
  const [isStart, setIsStart] = useState(false);

  useEffect(() => {
    checkAttendStart(setIsStart);
    checkAdminState(navigate);
  }, [navigate]);

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

  return { code, isStart, createCode, endCode };
};

const useCreateSessionForm = (onSuccess) => {
  const [sessionName, setSessionName] = useState('');
  const [date, setDate] = useState('');
  const { createSession } = useCreateSession();

  const onChangeSessionName = (text) => {
    setSessionName(text);
  };

  const onChangeDate = (text) => {
    setDate(text);
  };

  const onPressCreateSession = async () => {
    try {
      await createSession({ sessionName, date });
      onSuccess();
    } catch (error) {
      console.error('Failed to create session:', error);
      alert('세션 생성에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return {
    sessionName,
    date,
    onChangeSessionName,
    onChangeDate,
    onPressCreateSession,
  };
};


const useCreateSessionPage = (navigate) => {
  const [isStart, setIsStart] = useState(true);

  useEffect(() => {
    checkAttendStart(setIsStart);
    checkAdminState(navigate);
  }, [navigate]);

  return { isStart };
};


export { useCreateSession,useAttendUpdate, useCheckUserAttend, useCreateCode   };