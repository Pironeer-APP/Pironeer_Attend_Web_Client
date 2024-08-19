import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { api } from "../utils/api";
// useLogin Hook
function useLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginStatus, setLoginStatus] = useState(true);
  
    const onChangeUsername = (value) => {
      setUsername(value);
    };
  
    const onPressLogin = async (navigate) => {
      try {
        const response = await api.post("/user/login", {
          username,
          password,
        });
        console.log(response);
    
        // Check if the response contains the token inside the data object
        if (!response || !response.data || !response.data.token) {
          throw new Error("Invalid response: No token found");
        }
    
        const token = response.data.token;
        
        // Ensure the token is a string
        if (typeof token !== "string") {
          throw new Error("Invalid token: Token is not a string");
        }
    
        const decodedToken = jwtDecode(token);
        const isAdmin = decodedToken._isAdmin;
        console.log(decodedToken);
    
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("id", decodedToken._id);
        sessionStorage.setItem("isAdmin", decodedToken._isAdmin);
        sessionStorage.setItem("username", username);
    
        if (isAdmin === "true") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        setLoginStatus(false);
      }
    };
    const onPressLogout = (navigate) => {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("isAdmin");
      sessionStorage.removeItem("username");
  
      navigate("/login");
    };
    
    
  
    return {
      username,
      password,
      loginStatus,
      onChangeUsername,
      setPassword,
      onPressLogin,
      onPressLogout,
    };
  }

export { useLogin };