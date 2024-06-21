import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Container from "./components/Container";
import Logo from "./components/common/Logo";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import UserCheckPage from "./pages/UserCheckPage";

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
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
