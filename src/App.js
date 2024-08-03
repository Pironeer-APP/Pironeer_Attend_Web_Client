import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignUpPage";
import UserCheckPage from "./pages/UserCheckPage";
import AdminPage from "./pages/AdminPage";
import SessionListPage from "./pages/SessionListPage";
import CreateCodePage from "./pages/CreateCodePage";
import UserListPage from "./pages/UserListPage";
import UpdateUserPage from "./pages/UpdateUserPage";
import CheckUserAttendPage from "./pages/CheckUserAttendPage";
import CreateSessionPage from "./pages/CreateSessionPage";
import {
  AdminProtectedRoute,
  UserProtectedRoute,
} from "./components/common/Authentication";

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
    element: (
      <UserProtectedRoute>
        <UserCheckPage />
      </UserProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <AdminProtectedRoute>
        <AdminPage />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/sessions",
    element: (
      <AdminProtectedRoute>
        <SessionListPage />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/createSession",
    element: (
      <AdminProtectedRoute>
        <CreateSessionPage />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/createCode",
    element: (
      <AdminProtectedRoute>
        <CreateCodePage />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <AdminProtectedRoute>
        <UserListPage />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/updateUser",
    element: (
      <AdminProtectedRoute>
        <UpdateUserPage />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/checkAttend",
    element: (
      <AdminProtectedRoute>
        <CheckUserAttendPage />
      </AdminProtectedRoute>
    ),
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
