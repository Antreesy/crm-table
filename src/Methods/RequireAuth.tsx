import * as React from "react";
import { useLocation, Navigate } from "react-router-dom";

import { useAuth } from "../Methods/UseAuth";

interface IProps {
  children: JSX.Element;
}

const  RequireAuth = (props: IProps) => {
    const auth = useAuth();
    const location = useLocation();
  
    if (!auth.user) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return props.children;
  }

  export default RequireAuth;