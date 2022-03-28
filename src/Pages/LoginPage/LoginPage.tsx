import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import ILocationStateType from "../../Interfaces/ILocationStateType";
import { useAuth } from "../../Methods/UseAuth";

import Server from "../../Server";

import c from "./loginpage.module.scss"

const LoginPage = () => {
  const [error, setError] = useState<boolean>(false)
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as ILocationStateType;
    const auth = useAuth();
  
    const from = state?.from.pathname || "/";
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      const formData = new FormData(event.currentTarget);
      const username = formData.get("username") as string;
      const password = formData.get("password") as string;

      Server.isUserAuthorized(username, password).then((resolve) => {
        if (!resolve) {
          setError(true)
          return
        };

        auth.signin(username, () => {
          navigate(from, { replace: true });
        });
      })
    }
  
    return (
      <div className={c.login_page}>
        <h3 className={c.caption}>Добро пожаловать!</h3>
        <h4 className={c.descr}>Авторизуйтесь, чтобы продолжить</h4>
        <div className={c.form}>
          <form className={c.login_form} onSubmit={handleSubmit}>
            <label className={c.label} >
              <span className={c.labeltext}>Логин</span>
              <input type="text" name="username" placeholder="username"/>
            </label>
            <label className={c.label}>
              <span className={c.labeltext}>Пароль</span>
              <input type="password" name="password" placeholder="password"/>
            </label>
            {error && <p className={c.error_caption}>Проверьте введёные данные</p>}
            <button type="submit">Войти</button>
            <p className={c.message}>Не зарегистрированы? <a href="/">Создайте аккаунт</a></p>
          </form>
        </div>
      </div>
    );
  }

  export default LoginPage;