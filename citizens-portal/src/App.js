import './static/styles/App.scss';
import './static/styles/Login.scss';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Menu from "./components/Menu";
import Login from "./pages/Login";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

function App() {
    return (
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
    );
}

export default App;
