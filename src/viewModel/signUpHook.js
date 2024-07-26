import { useState } from "react";
import { api } from "../utils/api";

function useSignup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [signupStatus, setSignupStatus] = useState(true);
  
    const onChangeUsername = (value) => {
      setUsername(value);
    };
  
    const onChangePassword = (value) => {
      setPassword(value);
    };
  
    const onChangeEmail = (value) => {
      setEmail(value);
    };
  
    const onPressSignup = async (navigate) => {
      try {
        const response = await api.post("/user/signup", {
          username,
          password,
          email,
        });
        console.log(`username: ${username}`);
        console.log(`password: ${password}`);
        console.log(`email: ${email}`);
  
        // 240621 연우: 회원가입하면 바로 로그인할 수 있도록 수정해도 좋을 것 같습니다.
        navigate("/users");
      } catch (error) {
        console.error(error);
        setSignupStatus(false);
      }
    };
  
    return {
      username,
      password,
      email,
      signupStatus,
      onChangeUsername,
      onChangePassword,
      onChangeEmail,
      onPressSignup,
    };
  }
export { useSignup };