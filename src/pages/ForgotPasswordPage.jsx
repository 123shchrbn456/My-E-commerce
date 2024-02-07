import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            toast.success("Email was sent");
        } catch (error) {
            toast.error("Could not send reset password email");
        }
    };
    return (
        <form className="login-form" onSubmit={submitHandler}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" value={email} onChange={emailChangeHandler} />
            <button type="submit">Send reset password</button>
        </form>
    );
};

export default ForgotPasswordPage;
