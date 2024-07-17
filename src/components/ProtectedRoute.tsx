import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

interface ProtectedRouteProps {
  authenticationPath: string;
  element: React.ReactElement;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  authenticationPath,
  element,
}) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated) {
    return element;
  } else {
    return (
      <Navigate to={authenticationPath} state={{ from: location }} replace />
    );
  }
};
