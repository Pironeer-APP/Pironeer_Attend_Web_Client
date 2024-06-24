import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Container } from "./components/common/Container";
import Logo from "./components/common/Logo";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import UserCheckPage from "./pages/UserCheckPage";
import AdminPage from "./pages/AdminPage";
import SessionList from "./components/admin/SessionList";
import CreateCode from "./components/admin/CreateCode";
import UserList from "./components/admin/UserList";
import UpdateUser from "./components/admin/UpdateUser";
import CheckUserAttend from "./components/admin/CheckUserAttend";
import CreateSessionPage from "./components/admin/CreateSession";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
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
