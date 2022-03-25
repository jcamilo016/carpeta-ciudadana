function Login({children}) {
    return (
        <div className="login-container">
            <div className="image-container" />
            <div className="form-container">
                {children}
            </div>
        </div>
    )
}

export default Login;