import React from "react";
import { COLORS } from "../../utils/theme";
import {  useLocation } from "react-router-dom";
import { Container, ContentContainer, InputContainer } from "../../components/common/Container";
import { StyledInput } from "../../components/common/Input";
import { MainButton } from "../../components/common/Button";
import { PageHeader } from "../../components/common/Header";
import {Gap} from "../common/Gap";
import { useUpdateUser } from "../../viewModel/adminHook";
import { useLogin } from "../../viewModel/loginHook";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const location = useLocation();
  const { userId } = location.state || {};
  const { username, setUsername, email, setEmail, password, setPassword, handleUpdateUser } = useUpdateUser(userId);
  const { onPressLogout } = useLogin();
  const navigate = useNavigate();
  const buttons = [
    {
      label: '로그아웃',
      bgColor: COLORS.orange,
      color: 'black',
      onClick: () => onPressLogout(navigate),
    },
  ];

  return (
    <Container>
      <PageHeader text={`유저 정보 변경`} navigateOnClick="/admin" buttons={buttons}/>
      <Gap />
      <ContentContainer>
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
        <MainButton content="변경 완료" onPress={handleUpdateUser} />
      </InputContainer>
      </ContentContainer>
    </Container>
  );
};

export default UpdateUser;
