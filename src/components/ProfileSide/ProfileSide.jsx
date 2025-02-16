import React from "react";
import ProfileCard from '../ProfileCard/ProfileCard';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings'; // Fixed Import
import LogoutIcon from '@mui/icons-material/Logout';

import "./ProfileSide.css";

const ProfileSide = () => {
    return (
        <div className="ProfileSide">
            <ProfileCard />
            <div className="Menu">
                <Link to="/" className="menu-items">
                    <HomeIcon style={{ marginRight: 10, color: "#3db3f3" }} />
                    Home
                </Link>
                <Link to="/profile" className="menu-items">
                    <AccountCircleIcon style={{ marginRight: 10, color: "#3db3f3" }} />
                    Profile
                </Link>
                <Link to="/settings" className="menu-items">
                    <SettingsIcon style={{ marginRight: 10, color: "#3db3f3" }} />
                    Settings
                </Link>
                <Link to="/logout" className="menu-items">
                    <LogoutIcon style={{ marginRight: 10, color: "#3db3f3" }} />
                    Logout
                </Link>
            </div>
        </div>
    );
};

export default ProfileSide;
