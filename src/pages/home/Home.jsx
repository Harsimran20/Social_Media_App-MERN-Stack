import React, { useEffect } from 'react';
import PostSide from '../../components/PostSide/PostSide';
import ProfileSide from '../../components/ProfileSide/ProfileSide'; // Fixed import path
import RightSide from '../../components/RightSide/RightSide';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

 /* useEffect(() => {
    if (!localStorage.getItem("userId")) {
      navigate("/");
    }
  }, [navigate]); // Added dependency to useEffect to prevent missing dependency warning*/

  return (
    <div className="Home">
      <ProfileSide />
      <PostSide />
      <RightSide />
    </div>
  );
};

export default Home;
