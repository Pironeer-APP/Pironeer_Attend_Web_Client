import React, { useState, useEffect } from "react";
import { client } from "../../utils/client";
import bcrypt from "bcryptjs";
import { Container, InputContainer } from "../../components/common/Container";
import { StyledInput } from "../../components/common/Input";
import { MainButton } from "../../components/common/Button";
import { Header } from "../../components/common/Header";
import { Gap } from "../common/Gap";
import useUserStore from "../../store/userStore";
import { useNavigate } from "react-router-dom";

const UpdateUserForm = ({ userId }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useUserStore();

  useEffect(() => {
    if (!userId) {
      console.error("User ID not provided");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await client.get(`/user/users/${userId}`, user.token);
        const user = response.data;

        // 240727 연우: admin에서 사용자 정보를 변경하는 것이므로 user store를 사용하지 않음.
        setUsername(user.username);
        setEmail(user.email);
        setPassword("");
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleUpdateUser = async () => {
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

  return (
    <Container>
      <Header text={`유저 정보 변경`} navigateOnClick="/admin" />
      <Gap />
      <InputContainer>
        <StyledInput
          placeholder="이름"
          keyboardType="default"
          value={username}
          onChangeText={(value) => setUsername(value)}
          maxLength={50}
        />
        <StyledInput
          placeholder="이메일"
          type="email"
          value={email}
          onChangeText={(value) => setEmail(value)}
          maxLength={50}
        />
        <StyledInput
          placeholder="비밀번호"
          type="password"
          value={password}
          onChangeText={(value) => setPassword(value)}
          maxLength={50}
        />
      </InputContainer>
      <MainButton content="변경 완료" onPress={handleUpdateUser} />
    </Container>
  );
};

export default UpdateUserForm;
