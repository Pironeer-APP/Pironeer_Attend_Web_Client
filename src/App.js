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
import CreateSessionPage from "./pages/CreateSessionPage";
import { AdminProtectedRoute, UserProtectedRoute } from "./components/common/Authentication";

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
        <SessionList />
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
        <CreateCode />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <AdminProtectedRoute>
        <UserList />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/updateUser",
    element: (
      <AdminProtectedRoute>
        <UpdateUser />
      </AdminProtectedRoute>
    ),
  },
  {
    path: "/checkAttend",
    element: (
      <AdminProtectedRoute>
        <CheckUserAttend />
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
