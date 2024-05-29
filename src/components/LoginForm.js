import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../assets/Theme';
import { FontStyledText, StyledText } from '../components/Text';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { client } from '../utils/client';

// LoginInput component
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

function LoginInput(props) {
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

// useLogin Hook
export const autoHyphen = (value) => {
    const newValue = value
      .replace(/[^0-9]/g, '')
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
    return newValue;
}

function useLogin() {
  const [phoneId, setPhoneId] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(true);

  const onChangePhoneId = (value) => {
    value = autoHyphen(value);
    setPhoneId(value);
  };

  const onPressLogin = async (navigate) => {
    const url = '/auth/login';
    const body = {
      phone: phoneId,
      password: password,
    };
    try {
      const fetchData = await client.post(url, body);
      console.log('info...', fetchData.token); // If login info don't match => {token: false}
      if (fetchData.token === false) {
        setLoginStatus(false);
      } else {
        setLoginStatus(true);
        const jsonUserInfo = JSON.stringify(fetchData.token);
        localStorage.setItem('user_token', jsonUserInfo);
        navigate('/admin'); // Redirect to admin page or user page
      }
    } catch (err) {
      console.log(err);
    }
  };

  return {
    phoneId,
    password,
    loginStatus,
    onChangePhoneId,
    setPassword,
    onPressLogin,
  };
}

// LoginForm component
export default function LoginForm() {
  const navigate = useNavigate();
  const {
    phoneId,
    password,
    loginStatus,
    onChangePhoneId,
    setPassword,
    onPressLogin,
  } = useLogin();

  const onPressFindAccount = () => {
    navigate('/find-account'); // 비미번호 찾기 추후 구현
  };

  return (
    <LoginInputContainer>
      <LoginInput
        placeholder="전화번호"
        keyboardType="default"
        value={phoneId}
        onChangeText={onChangePhoneId}
        maxLength={13}
      />
      <LoginInput
        placeholder="비밀번호"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <StyledLoginButton onClick={() => onPressLogin(navigate)}>로그인</StyledLoginButton>
      {!loginStatus && <StyledWarning>일치하는 회원 정보가 없습니다.</StyledWarning>}
      <FindAccountButton onClick={onPressFindAccount}>
        <StyledText content="비밀번호 찾기" fontSize={15} />
      </FindAccountButton>
    </LoginInputContainer>
  );
}

const LoginInputContainer = styled.div`
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

const FindAccountButton = styled.button`
  align-self: center;
  padding: 2rem;
  background: none;
  border: none;
  cursor: pointer;
`;

const StyledLoginButton = styled.button`
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
