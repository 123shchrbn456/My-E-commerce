import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });

    const logoutHandler = () => {
        auth.signOut();
        navigate("/");
    };

    return (
        <div>
            <h1>My profile</h1>
            <form>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={formData.name} disabled />
                <label htmlFor="email">Email</label>
                <input type="text" id="email" value={formData.email} disabled />
            </form>
            <div>
                <p>
                    Do you want to change your name?
                    <button>Edit</button>
                </p>
                <button onClick={logoutHandler}>Sign out</button>
            </div>
        </div>
    );
};

export default ProfilePage;
