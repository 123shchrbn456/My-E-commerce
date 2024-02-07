import React from "react";
import { FcGoogle } from "react-icons/fc";
import LoginForm from "../features/login-registration/LoginForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const googleLoginHandler = async () => {};
    return (
        <div>
            <LoginForm />
            <p>
                Don't have an account?<Link to="/registration">Register</Link>
            </p>
            <p>
                <Link to="/forgot-password">Forgot password?</Link>
            </p>
            <button type="button" onClick={googleLoginHandler}>
                <FcGoogle />
                Continue with Google
            </button>
        </div>
    );
};

export default LoginPage;
