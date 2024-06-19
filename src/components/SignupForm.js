import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../assets/Theme';
import { FontStyledText, StyledText } from '../components/Text';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { client } from '../utils/client';;

function useSignup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
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
      const response = await client.post('/signup', {
        username,
        password,
        email,
      });

      navigate('/login');

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


// SignupInput component
const StyledTextInput = styled.input`
  height: 5rem; 
  margin-bottom: 2.5rem;
  font-size: 2rem;
  padding: 1rem 2rem;
  border-radius: 1rem; 
  background-color: ${COLORS.gray};
  color: white;
  width: 100%;
  border: none;

  &::placeholder {
    color: ${COLORS.light_gray};
  }
`;

function SignupInput(props) {
  return (
    <StyledTextInput
      type={props.secureTextEntry ? 'password' : 'text'}
      placeholder={props.placeholder}
      value={props.value}
      onChange={e => props.onChangeText(e.target.value)}
      maxLength={props.maxLength}
      {...(props.keyboardType === 'numeric' ? { pattern: '[0-9]*' } : {})}
    />
  );
}

// SignupForm component
export default function SignupForm() {
  const navigate = useNavigate();
  const {
    username,
    password,
    email,
    signupStatus,
    onChangeUsername,
    onChangePassword,
    onChangeEmail,
    onPressSignup,
  } = useSignup();

  return (
    <SignupInputContainer>
      <SignupInput
        placeholder="이름"
        keyboardType="default"
        value={username}
        onChangeText={onChangeUsername}
        maxLength={50}
      />
      <SignupInput
        placeholder="이메일"
        keyboardType="default"
        value={email}
        onChangeText={onChangeEmail}
        maxLength={50}
      />
      <SignupInput
        placeholder="비밀번호"
        value={password}
        onChangeText={onChangePassword}
        secureTextEntry={true}
      />
      <StyledSignupButton onClick={() => onPressSignup(navigate)}>회원 가입</StyledSignupButton>
      {!signupStatus && <StyledWarning>회원 가입에 실패했습니다. 다시 시도해주세요.</StyledWarning>}
    </SignupInputContainer>
  );
}

const SignupInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; 
  max-width: 50rem; 
  margin: 0 auto; 
  padding: 10rem; 
  align-items: center; 
`;

const StyledWarning = styled(FontStyledText)`
  color: red;
  margin: 0.5rem;
`;

const StyledSignupButton = styled.button`
  height: 5rem; 
  margin-top: 2.5rem;
  font-size: 2rem;
  padding: 1rem 2rem;
  border-radius: 1rem; 
  background-color: ${COLORS.green};
  color: white;
  width: 100%; 
  border: none;
  cursor: pointer;
  text-align: center;
`;
