import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";

const ProfilePage = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });
    const [editMode, setEditMode] = useState(false);

    const logoutHandler = () => {
        auth.signOut();
        navigate("/");
    };

    const changeNameHandler = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            name: e.target.value,
        }));
    };

    const submitHandler = async () => {
        try {
            if (auth.currentUser.displayName !== formData.name) {
                // update display name in firebase auth
                await updateProfile(auth.currentUser, {
                    displayName: formData.name,
                });

                // update name in the firestore
                const docRef = doc(db, "users", auth.currentUser.uid);
                await updateDoc(docRef, {
                    name: formData.name,
                });
                toast.success("Profile details are updated");
            }
        } catch (err) {
            console.error(err);
            toast.error("Could not update the profile");
        }
    };

    return (
        <div>
            <h1>My profile</h1>
            <form>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={formData.name} disabled={!editMode} onChange={changeNameHandler} />
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={formData.email} disabled />
            </form>
            <div>
                <p>
                    Do you want to change your name?
                    <button
                        onClick={() => {
                            if (editMode) submitHandler();
                            setEditMode((prevValue) => !prevValue);
                        }}
                    >
                        {editMode ? "Apply change" : "Edit"}
                    </button>
                </p>
                <button onClick={logoutHandler}>Sign out</button>
            </div>
        </div>
    );
};

export default ProfilePage;
