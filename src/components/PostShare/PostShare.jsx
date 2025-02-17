import React, { useState, useRef } from "react";
import "./PostShare.css";
import {
  UilScenery,
  UilPlayCircle,
  UilLocationPoint,
  UilSchedule,
  UilTimes,
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
      reader.onload = function (e) {
        setImage({
          image: URL.createObjectURL(img),
          base64String: e.target.result,
        });
      };
      reader.readAsDataURL(img);
      event.target.value = null;
    }
  };

  const onVideoChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      let vid = event.target.files[0];
      let reader = new FileReader();
      reader.onload = function (e) {
        setVideo({
          video: URL.createObjectURL(vid),
          base64String: e.target.result,
        });
      };
      reader.readAsDataURL(vid);
      event.target.value = null;
    }
  };

  const postImage = async (e) => {
    e.preventDefault();

    if (image !== null) {
      console.log("Uploading image...");
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
          console.log("Image uploaded successfully");
        } else {
          console.error("Error uploading image");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }

    setImage(null);
    setDesc("");
    setVideo(null);
    if (imageRef.current) imageRef.current.value = "";
    if (videoRef.current) videoRef.current.value = "";
  };

  return (
    <div className="PostShare">
      <img src={localStorage.getItem("image")} alt="" />
      <div>
        <div className="InputContainer">
          <input
            placeholder="What's happening ?!"
            type="text"
            className="input"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            📷 Add Photo
          </div>
          <input type="file" ref={imageRef} style={{ display: "none" }} onChange={onImageChange} />

          <div
            className="option"
            style={{ color: "var(--video)" }}
            onClick={() => videoRef.current.click()}
          >
            🎥 Add Video
          </div>
          <input type="file" ref={videoRef} style={{ display: "none" }} onChange={onVideoChange} />
        </div>

        {image && <img src={image.image} alt="Preview" className="preview" />}
        {video && <video src={video.video} controls className="preview" />}

        <button onClick={postImage} className="postButton">
          Post
        </button>
      </div>
    </div>
  );
};

export default PostShare;


