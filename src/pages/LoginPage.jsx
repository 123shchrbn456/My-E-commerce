import React from "react";
<<<<<<< HEAD
import RegistrationForm from "../features/login-registration/RegistrationForm";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const googleLoginHandler = async (e) => {
        try {
            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // check for the user

            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp(),
                });
            }
            navigate("/");
        } catch (err) {
            console.log(err);
            toast.error("Could not authorize with google");
        }
    };
    return (
        <div>
            <RegistrationForm />
=======
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
>>>>>>> tmp
            <button type="button" onClick={googleLoginHandler}>
                <FcGoogle />
                Continue with Google
            </button>
        </div>
    );
};

export default LoginPage;
