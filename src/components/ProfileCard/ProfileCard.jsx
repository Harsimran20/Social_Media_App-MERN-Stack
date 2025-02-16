import React, { useEffect, useState } from "react";
import Cover from "../../images/Cover.jpg";
import "./ProfileCard.css";

const ProfileCard = () => {
    const [profileData, setProfileData] = useState(null); // Initialize as null

    const fetchInfo = async () => {
        try {
            const response = await fetch('/profile/data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({})
            });

            console.log("Fetching profile info response", response);

            if (response.ok) {
                const resp = await response.json();
                setProfileData(resp);
            } else {
                console.error("Failed to fetch profile data");
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    return (
      <div className="ProfileImages">
      <img src={Cover} alt="Cover" />
      
      {/* Statistics on the cover image */}
      <div className="ProfileStats">
          <div>
              <span>{profileData?.followings ?? 0}</span>
              <span className="textbased">Followings</span>
          </div>
          <div>
              <span>{profileData?.followers ?? 0}</span>
              <span className="textbased">Followers</span>
          </div>
          <div>
              <span>{profileData?.posts ?? 0}</span>
              <span className="textbased">Posts</span>
          </div>
      </div>
  </div>
  
    );
};

export default ProfileCard;


