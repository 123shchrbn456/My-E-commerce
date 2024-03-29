import React from "react";
import RegistrationForm from "../features/login-registration/RegistrationForm";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
    const navigate = useNavigate();
    const googleRegistrationHandler = async (e) => {
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
            <button type="button" onClick={googleRegistrationHandler}>
                <FcGoogle />
                Continue with Google
            </button>
        </div>
    );
};

export default RegistrationPage;
