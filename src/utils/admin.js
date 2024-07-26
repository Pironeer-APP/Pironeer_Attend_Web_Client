import { client } from "./client";

// 240722: admin의 viewmodel로 빼야하지 않을까?
export const createSession = async (sessionName, date, token) => {
  try {
    const response = await client.post("/session/createSession", {
      name: sessionName,
      date: date,
    });
    console.log("session created", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating session:", error);
    throw error;
  }
};
export const getSessions = async (token) => {
  try {
    const response = await client.get("/session/sessions");

    if (Array.isArray(response.data)) {
      console.log("sessions fetched:", response.data);
      return response.data;
    } else {
      console.error("Unexpected response format:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching sessions:", error);
    throw error;
  }
};

export const startAttendCheck = async (sessionId, token) => {
  try {
    console.log(`Starting attendance check for session ID: ${sessionId}`);
    const response = await client.post(
      `/session/startAttendCheck/${sessionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error starting attendance check:", error);
    throw error;
  }
};

export const endAttendCheck = async (token) => {
  try {
    const response = await client.delete("/session/endAttendCheck");
    return response.data;
  } catch (error) {
    console.error("Error ending attendance check:", error);
    throw error;
  }
};
export const deleteSession = async (sessionId, token) => {
  const response = await client.delete(`/session/deleteSession/${sessionId}`);
  console.log("session deleted", response);

  return response.data;
};
