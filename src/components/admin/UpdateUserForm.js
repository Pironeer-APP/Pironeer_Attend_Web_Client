import React, { useState, useEffect } from "react";
import { client } from "../../utils/client";
import bcrypt from "bcryptjs";
import { InputContainer } from "../../components/common/Container";
import { StyledInput } from "../../components/common/Input";
import useUserStore from "../../store/userStore";
import { useNavigate } from "react-router-dom";
import { MainButton } from "../common/Button";
import { StyledText, StyledWarning } from "../common/Text";
import { COLORS } from "../../utils/theme";

const useUserUpdate = (userId) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [updateStatus, setUpdateStatus] = useState(true);
  const { user } = useUserStore();

  const onChangeUsername = (value) => {
    setUsername(value);
  };

  const onChangePassword = (value) => {
    setPassword(value);
  };

  const onChangeEmail = (value) => {
    setEmail(value);
  };

  // 240727 연우: password가 비어있는 상황에서의 예외처리 필요
  const onPressUpdate = async (navigate) => {
    try {
      let hashedPassword = password;

      if (password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
      }

      await client.put(`/user/users/${userId}`, user.token, {
        username,
        email,
        password: hashedPassword,
      });
      alert("유저 정보가 변경되었습니다.");
      navigate("/users");
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("유저 정보 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const fetchUser = async () => {
    try {
      const response = await client.get(`/user/users/${userId}`, user.token);
      // user는 현재 접속 중인 대상, targetUser는 정보를 받아오는 유저
      const targetUser = response.data;

      // 240727 연우: admin에서 사용자 정보를 변경하는 것이므로 user store를 사용하지 않음.
      setUsername(targetUser.username);
      setEmail(targetUser.email);
      setPassword("");
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  return {
    username,
    password,
    email,
    updateStatus,
    onChangeUsername,
    onChangePassword,
    onChangeEmail,
    onPressUpdate,
    fetchUser,
  };
};

const UpdateUserForm = ({ userId }) => {
  const navigate = useNavigate();

  const {
    username,
    password,
    email,
    updateStatus,
    onChangeUsername,
    onChangePassword,
    onChangeEmail,
    onPressUpdate,
    fetchUser,
  } = useUserUpdate(userId);

  useEffect(() => {
    if (!userId) {
      console.error("User ID not provided");
      return;
    }

    fetchUser();
  }, [userId]);

  return (
    <InputContainer>
      <StyledInput
        placeholder="이름"
        keyboardType="default"
        value={username}
        onChangeText={onChangeUsername}
        maxLength={50}
      />
      <StyledInput
        placeholder="이메일"
        type="email"
        value={email}
        onChangeText={onChangeEmail}
        maxLength={50}
      />
      <StyledInput
        placeholder="비밀번호"
        secureTextEntry={true}
        value={password}
        onChangeText={onChangePassword}
        maxLength={50}
      />
      <MainButton
        content={"유저 정보 변경"}
        onPress={() => onPressUpdate(navigate)}
      />
      {!updateStatus && (
        <StyledText
          content={"회원 가입에 실패했습니다. 다시 시도해주세요."}
          fontSize={"1rem"}
          color={COLORS.green}
        />
      )}
    </InputContainer>
  );
};

export default UpdateUserForm;
