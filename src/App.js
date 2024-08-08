import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Container } from "./components/common/Container";
import Logo from "./components/common/Logo";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import UserAttendPage from "./pages/UserAttendPage";
import AdminPage from "./pages/AdminPage";
import SessionList from "./components/admin/SessionList";
import CreateCode from "./components/admin/CreateCode";
import UserList from "./components/admin/UserList";
import UpdateUser from "./components/admin/UpdateUser";
import UpdateUserAttend from "./components/admin/UpdateUserAttend";
import CreateSessionPage from "./components/admin/CreateSessionPage";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import UserDepositPage from "./pages/UserDepositPage";
import AdminDepositPage from "./pages/AdminDepositPage.js";
const router = createBrowserRouter([
  {
    path: "/signup",
    element: (
      <AdminProtectedRoute>
        <SignupPage />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <UserAttendPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/sessions",
    element: <SessionList />,
  },
  {
    path: "/createSession",
    element: <CreateSessionPage />,
  },
  {
    path: "/createCode",
    element: <CreateCode />,
  },
  {
    path: "/users",
    element: <UserList />,
  },
  {
    path: "/updateUser",
    element: <UpdateUser />,
  },
  {
    path: "/checkAttend",
    element: <UpdateUserAttend />,
  },
  {
    path: "/userDeposit",
    element: <UserDepositPage />,
  },
  {
    path: "/adminDeposit",
    element: <AdminDepositPage />,
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
