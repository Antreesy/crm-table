import React, { useState } from "react";

import { fakeAuthProvider } from "../auth";
import {AuthContext} from "../Methods/UseAuth"

interface IProps {
    children: React.ReactNode;
}

const AuthProvider = (props: IProps) => {
    const [user, setUser] = useState<string | null>(null);
  
    const signin = (newUser: string, callback: VoidFunction) => {
      return fakeAuthProvider.signin(() => {
        setUser(newUser);
        callback();
      });
    };
  
    const signout = (callback: VoidFunction) => {
      return fakeAuthProvider.signout(() => {
        setUser(null);
        callback();
      });
    };
  
    const value = { user, signin, signout };
  
    return <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>;
}

export default AuthProvider;