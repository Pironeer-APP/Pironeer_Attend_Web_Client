export async function client(endpoint, { body, ...customConfig } = {}) {
  const SERVER_URL = "http://3.38.96.3:3000/api";
  const headers = { "Content-Type": "application/json" };

  const token = localStorage.getItem("token");
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

  console.log(`Making request to ${SERVER_URL + endpoint} with config:`, config);

  let response, data;
  try {
    response = await fetch(SERVER_URL + endpoint, config);
    console.log("Full response object:", response);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    data = await response.json();
    return { status: response.status, data }; // Return both status and data
  } catch (err) {
    return Promise.reject(err.message ? err.message : { status: response.status, data });
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
