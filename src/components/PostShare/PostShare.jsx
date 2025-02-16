import React, { useState, useRef } from "react";
import Profile from "../../images/Profile.jpg";
import "./PostShare.css";
import { 
    UilScenery, 
    UilPlayCircle, 
    UilLocationPoint, 
    UilSchedule, 
    UilTimes 
} from "@iconscout/react-unicons";

const PostShare = () => {
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const videoRef = useRef();
  const [video, setVideo] = useState(null);
  const [desc, setDesc] = useState("");

  const onImageChange = async (event) => {
      if (event.target.files && event.target.files[0]) {
          let img = event.target.files[0];
          let reader = new FileReader();
          reader.onload = function (event) {
              setImage({
                  image: URL.createObjectURL(img),
                  base64String: event.target.result
              });
          };
          reader.readAsDataURL(img);
          event.target.value=null;
      }
  };
};
const postImage = async (e) => {
  e.preventDefault();
  
  if (image !== null) {
      console.log("Hit in the image");
      try {
          const formData = new FormData();
          formData.append("images", image.base64String);
          formData.append("name", "Tzuyu");
          formData.append("userId", localStorage.getItem("userId"));
          formData.append("desc", desc);
          formData.append("likes", 0);
          formData.append("liked", false);

          const response = await fetch("http://localhost:3000/api/posts/upload", {
              method: "POST",
              body: formData,
          });

          if (response.ok) {
              console.log("Image uploaded successfully:");
          } else {
              console.error("Error uploading image:");
          }
      } catch (error) {
          console.error("Error uploading image:", error);
      }
  }
  imageRef.current = null;
setImage(null);
setDesc("");
setVideo(null);
videoRef.current = null;

};


  return (
      <div className="PostShare">
          <img src={Profile} alt="Profile" />
          <div>
              <input 
                  type="text" 
                  placeholder="What's on your mind?" 
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)} 
              />
              <div className="PostOptions">
                  <div className="option" onClick={() => imageRef.current.click()}>
                      <UilScenery /> Photo
                  </div>
                  <div className="option" onClick={() => videoRef.current.click()}>
                      <UilPlayCircle /> Video
                  </div>
                  <div className="option">
                      <UilLocationPoint /> Location
                  </div>
                  <div className="option">
                      <UilSchedule /> Schedule
                  </div>
              </div>
              <button className="button ps-button">Share</button>
              <input 
                  type="file" 
                  ref={imageRef} 
                  style={{ display: "none" }} 
                  onChange={onImageChange} 
              />
              <input 
                  type="file" 
                  ref={videoRef} 
                  style={{ display: "none" }} 
              />
          </div>
      </div>
  );
};

export default PostShare;