import React from "react";
import ProfileCard from '../ProfileCard/ProfileCard';
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import "./ProfileSide.css";

const ProfileSide = () => {
    return (
        <div className="ProfileSide">
            <ProfileCard />
            <div className="Menu">
                <Link to="/">
                    <div className="menu-items">
                        <HomeIcon style={{ marginRight: 10, color: "#3db3f3" }} />
                        Home
                    </div>
                </Link>
                <Link to="/profile">
                    <div className="menu-items">
                        <AccountCircleIcon style={{ marginRight: 10, color: "#3db3f3" }} />
                        Profile
                    </div>
                </Link>
                <Link to="/logout">
                    <div className="menu-items">
                        <LogoutIcon style={{ marginRight: 10, color: "#3db3f3" }} />
                        Logout
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default ProfileSide;



