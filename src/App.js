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

const router = createBrowserRouter([
  {
    path: '/',
    element: (
    <>
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
    path: '/admin',
    element: (
    <>
    
      <Header text={"어드민님 반가워요"}/>
    </>
    )
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;