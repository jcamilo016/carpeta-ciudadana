import { createContext } from "react";

export const LoginContext = createContext({
    isLogged: false,
    citizen: null,
    setLogin: () => {},
});