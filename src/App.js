import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Container } from "./common/Container";
import Logo from "./common/Logo";
import LoginPage from "./pages/Login/LoginPage";
import SignupPage from "./pages/Admin/SignUpPage/SignUpPage";
import UserCheckPage from "./pages/User/UserCheckPage";
import AdminPage from "./pages/Admin/AdminPage/Admin";
import SessionList from "./pages/Admin/SessionListPage/SessionList";
import CreateCode from "./pages/Admin/SessionListPage/CreateCode";
import UserList from "./pages/Admin/UserListPage/UserList";
import UpdateUser from "./pages/Admin/UserListPage/UpdateUserInfo";
import CheckUserAttend from "./pages/Admin/UserListPage/UpdateUserAttendList";
import CreateSessionPage from "./pages/Admin/SessionCreatePage/CreateSession";
import AdminProtectedRoute from "./utils/AdminProtectedRoute";

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
    element: <UserCheckPage />,
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
    element: <CheckUserAttend />,
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
