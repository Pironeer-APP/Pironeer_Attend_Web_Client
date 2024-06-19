import React from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import './index.css'; 
import Container from './components/Container';
import Header from './components/Header';
import Logo from './components/Logo';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';
import UserCheckPage from './pages/UserCheckPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
    <>
      <Header text={"피로그래밍 출석"}/>
      <SignupPage />
    </>
    )
  },
  {
    path: '/login',
    element: (
    <>
      <Header text={"피로그래밍 출석"}/>
      <LoginPage />
    </>
    )
  },
  {
    path: '/userCheck',
    element: (
    <>
      <Header text={"님 반가워요"}/>
      <Container>
        <UserCheckPage />
      </Container>
    </>
    )
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;