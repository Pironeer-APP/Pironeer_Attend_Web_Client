// src/components/LoginPage.js
import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../assets/Theme';
import Logo from '../components/Logo';
import Container from '../components/Container';
import SignupForm from '../components/SignupForm';


export default function SignupPage() {
  return (
    <Container>
        <LoginScreenContainer>
          <Logo />
          <SignupForm />
        </LoginScreenContainer>
    </Container>
  );
}


const LoginScreenContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 2rem;
`;
