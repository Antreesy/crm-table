import * as React from "react";
import { useNavigate } from "react-router-dom";
import {  useAuth } from "../../Methods/UseAuth";

import c from "./authstatus.module.scss"

const AuthStatus = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    return (
      <p className={c.user}>
        Пользователь: {auth.user}{" "}
        <button
          className={c.signout}
          onClick={() => {
            auth.signout(() => navigate("/login"));
          }}
        >
          Выйти
        </button>
      </p>
    );
  }

  export default AuthStatus