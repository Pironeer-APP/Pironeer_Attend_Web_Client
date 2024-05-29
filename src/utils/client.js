


export async function client(endpoint, { body, ...customConfig } = {}) {
  const SERVER_URL = 'http://localhost:3000';
  const headers = { 'Content-Type': 'application/json' };

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body) {
    const userToken = localStorage.getItem('user_token'); // Use local storage
    if(userToken && !Object.keys(body).includes("userToken")) {
      body.userToken = userToken;
    }
    config.body = JSON.stringify(body);
  }

  let data;
  try {
    const response = await fetch(SERVER_URL + endpoint, config);
    if (response.ok) {
      data = await response.json();
      return data;
    }
    throw new Error(response.statusText);
  } catch (err) {
    return Promise.reject(err.message ? err.message : data);
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'GET' });
}

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body });
}
