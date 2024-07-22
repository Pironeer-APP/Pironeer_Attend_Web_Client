import { handleSessionExpired } from "./authentication";
export async function client(endpoint, { body, ...customConfig } = {}) {
  // const SERVER_URL = "https://piro-recruiting.top/api";
    const SERVER_URL = "http://localhost:3000/api"; 
  const headers = { "Content-Type": "application/json" };

  const token = sessionStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  let response, data;
  try {
    response = await fetch(SERVER_URL + endpoint, config);

    if (!response.ok) {
      await handleSessionExpired(response);
      const errorData = await response.json();
    throw new Error(errorData.message);
    }

    data = await response.json();
    return { status: response.status, data }; 
  } catch (err) {
    return Promise.reject(err.message ? err.message : 'An error occurred');
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "GET" });
};

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body, method: "POST" }); 
};

client.delete = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: "DELETE" });
};

client.put = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body, method: "PUT" });
};

client.sse = function (endpoint) {
  // const SERVER_URL = "https://piro-recruiting.top/api";
    const SERVER_URL = "http://localhost:3000/api"; 
  const token = sessionStorage.getItem("token");
  const url = `${SERVER_URL}${endpoint}?token=${token}`;
  
  return new EventSource(url);
};
