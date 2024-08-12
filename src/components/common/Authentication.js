import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../store/userStore";
import { checkAdminState, checkUserState } from "../../utils/authentication";

const AdminProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  console.log(user);

  useEffect(() => {
    checkAdminState(navigate, user.token, user.isAdmin);
  }, [navigate, user.token, user.isAdmin]);

  return children;
};

const UserProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  useEffect(() => {
    checkUserState(navigate, user.token, user.isAdmin);
  }, [navigate, user.token, user.isAdmin]);

  return children;
};

export { AdminProtectedRoute, UserProtectedRoute };
