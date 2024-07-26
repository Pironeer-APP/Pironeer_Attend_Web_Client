import { api } from '../utils/api';
import { useState,useEffect } from 'react';
import useListDataStore from '../states/listDataStore';
import useAttendStore from '../states/attendStore';
import { checkAdminState, checkAttendStart} from '../utils/authentication';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import { COLORS } from '../utils/theme';


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



const useSessionList = (navigate) => {
  const { data: sessions, loading, error, setData, setLoading, setError } = useListDataStore();

  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      try {
        const data = await getSessions();
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
    checkAdminState(navigate);
  }, [navigate, setData, setLoading, setError]);

  const handleDeleteClick = async (sessionId) => {
    try {
      await deleteSession(sessionId);
      setData((prevSessions) => prevSessions.filter((session) => session._id !== sessionId));
      alert("세션이 삭제되었습니다.");
    } catch (err) {
      setError(err.message);
    }
  };

  return { sessions, loading, error, handleDeleteClick };
};

const useUserList = () => {
  const navigate = useNavigate();
  const { data: users, loading, error, setData, setLoading, setError } = useListDataStore();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await api.get("/user/users");
        const filtered_user = response.data.filter(
          (user) => user.isAdmin === false
        );
        setData(filtered_user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    checkAdminState(navigate);
  }, [navigate, setData, setLoading, setError]);
  return { users, loading, error };

};


const useUpdateUser = (userId) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!userId) {
      console.error("User ID not provided");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await api.get(`/user/users/${userId}`);
        const user = response.data;
        setUsername(user.username);
        setEmail(user.email);
        setPassword('');
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
    checkAdminState(navigate);
  }, [userId, navigate]);

  const handleUpdateUser = async () => {
    try {
      let hashedPassword = password;

      if (password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
      }

      await api.put(`/user/users/${userId}`, {
        username,
        email,
        password: hashedPassword,
      });
      alert("유저 정보가 변경되었습니다.");
      navigate("/users");
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("유저 정보 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return {
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    handleUpdateUser,
  };
};


export { useCreateSession,useAttendUpdate, useCheckUserAttend, useCreateCode, useSessionList, useUserList, useUpdateUser };