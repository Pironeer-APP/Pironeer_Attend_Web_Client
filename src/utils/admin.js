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
  
      if (Array.isArray(response)) {
        console.log("sessions fetched:", response); 
        return response;
      } else {
        console.error('Unexpected response format:', response);
        return [];
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
      throw error;
    }
  };
  
  
  
  