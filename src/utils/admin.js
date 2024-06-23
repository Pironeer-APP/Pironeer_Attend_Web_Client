import { client } from './client';

export const createSession = async (sessionName, date) => {
  try {
    const response = await client.post('/session/createSession', {
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
export const getSessions = async () => {
    try {
      const response = await client.get('/session/sessions');
  
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
      const response = await client.post(`/session/startAttendCheck/${sessionId}`);
      
      return response.data;
    } catch (error) {
      console.error('Error starting attendance check:', error);
      throw error;
    }
  };
  
  export const endAttendCheck = async () => {
    try {
      const response = await client.delete('/session/endAttendCheck');
      return response.data;
    } catch (error) {
      console.error('Error ending attendance check:', error);
      throw error;
    }
  };
  