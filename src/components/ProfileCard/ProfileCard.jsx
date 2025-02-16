import React, { useEffect, useState } from "react";
import Cover from "../../images/Cover.jpg";
import Profile from "../../images/Profile.jpg"
import "./ProfileCard.css";

const ProfileCard = () => {
    const [profileData, setProfileData] = useState({});

    const fetchInfo = async () => {
        const formData = {
            userId: localStorage.getItem("userId"),
        };

        const response = await fetch("http://localhost:3000/api/profile/data", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        console.log("Fetching profile info response", response);

        if (response.ok) {
            const resp = await response.json();
            setProfileData(resp);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    return (
        <div className="profile-card">
            <img src={Cover} alt="Cover" />
            <img src={Profile} alt="Profile" />
            <h3>{profileData.name}</h3>
            <p>{profileData.bio}</p>
        </div>
    );
};

export default ProfileCard;
