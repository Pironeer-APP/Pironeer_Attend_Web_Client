import React from "react";
import {  useLocation } from "react-router-dom";
import { Container, InputContainer } from "../../components/common/Container";
import { StyledInput } from "../../components/common/Input";
import { MainButton } from "../../components/common/Button";
import { Header } from "../../components/common/Header";
import {Gap} from "../common/Gap";
import { useUpdateUser } from "../../viewModel/adminHook";


const UpdateUser = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const { username, setUsername, email, setEmail, password, setPassword, handleUpdateUser } = useUpdateUser(userId);
  

  return (
    <Container>
      <Header text={`유저 정보 변경`} navigateOnClick="/admin"/>
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

export default UpdateUser;
