import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });

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
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            updateProfile(auth.currentUser, {
                displayName: formData.name,
            });
            const user = userCredential.user;
            const formDataCopy = { ...formData };
            delete formDataCopy.password;
            formDataCopy.timestamp = serverTimestamp();
            await setDoc(doc(db, "users", user.uid), formDataCopy);
            console.log(user);
            toast.success("You are signed up");
            navigate("/");
        } catch (error) {
            toast.error("Something went wrong with registration");
        }
    };
    return (
        <form className="login-form" onSubmit={submitHandler}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={inputChangeHandler} />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={inputChangeHandler} />
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={formData.password} onChange={inputChangeHandler} />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;
