import { api } from '../utils/api';
import { useState } from 'react';

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

export { useCreateSession };