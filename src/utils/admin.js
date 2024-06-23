import { client } from './client';

export const createSession = async (sessionName, date) => {
  try {
    const response = await client.post('/createSession', {
      name: sessionName,
      date: date
    });
    return response.data;
  } catch (error) {
    console.error('Error creating session:', error);
    throw error;
  }
};
export const getSessions = async () => {
    try {
      const response = await client.get('/sessions');
      return response.data;
    } catch (error) {
      console.error('Error fetching sessions:', error);
      throw error;
    }
  };