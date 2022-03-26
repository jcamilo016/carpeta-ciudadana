import {useState} from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import {LoginForm, RegisterForm } from "./components";
import {LoginContext} from "./contexts/LoginContext";
import './static/styles/App.scss';
import './static/styles/Login.scss';
import './static/styles/Documents.scss';

function App() {
    const [loginInfo, setLogin] = useState({isLogged: false, citizen: null});

    return (
        <LoginContext.Provider value={{...loginInfo, setLogin}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={
                        <Login>
                            <LoginForm/>
                        </Login>
                    }/>
                    <Route path="portal" element={<Menu/>}/>
                    <Route path="signup" element={
                        <Login>
                            <RegisterForm />
                        </Login>
                    }/>
                    <Route path="*" element={
                        <Login>
                            <LoginForm/>
                        </Login>
                    }/>
                </Routes>
            </BrowserRouter>
        </LoginContext.Provider>
    );
}

export default App;
