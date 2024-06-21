import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {Container} from "./components/common/Container";
import Logo from "./components/common/Logo";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import UserCheckPage from "./pages/UserCheckPage";
import { Header } from "./components/common/Header";
import UserStatusPage from "./pages/UserStatusPage";
const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <UserCheckPage />,
  },
  {
    path: '/userStatus',
    element: (
    <>
        <UserStatusPage />
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
