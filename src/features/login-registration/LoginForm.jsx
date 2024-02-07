import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });

    const inputChangeHandler = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            if (userCredential.user) {
                toast.success("You are logged in");
                navigate("/");
            }
        } catch (error) {
            toast.error("Something went wrong with login");
        }
    };
    return (
        <form className="login-form" onSubmit={submitHandler}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={inputChangeHandler} />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={formData.password} onChange={inputChangeHandler} />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
