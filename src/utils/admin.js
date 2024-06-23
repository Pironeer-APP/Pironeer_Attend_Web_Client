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
      console.log("sessions fetched");
      return response.data;
    } catch (error) {
      console.error('Error fetching sessions:', error);
      throw error;
    }
  };