import React, { useEffect, useState } from 'react';
import './Posts.css';
import Post from '../Post/Post';
import commentIcon from '../../images/comment.png';
import shareIcon from '../../images/share.png';
import heartIcon from '../../images/heart.png';
import unlikeIcon from '../../images/unlike.png';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/posts/fetchAllPosts');
      if (!response.ok) throw new Error("Failed to fetch posts");
      const converted = await response.json();
      setPosts(converted);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLikes = async (post) => {
    console.log("Attributes", post);
    const formData = {
      _id: post._doc?._id,
      userId: localStorage.getItem("userId")
    };

    try {
      const response = await fetch('http://localhost:3000/api/profile/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchPosts(); // Refresh posts after like
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="Posts">
      {posts.length > 0 ? posts.slice().reverse().map((post, index) => (
        <div className="Post" key={index}>
          {post._doc?.format === "image" ? (
            <img 
              src={`data:image/jpeg;base64,${post.postBase64}`} 
              alt="Post Preview" 
            />
          ) : (
            <video 
              src={`data:video/mp4;base64,${post.postBase64}`}
              alt="Video Player"
              controls 
              style={{ maxWidth: '100%' }} 
            />
          )}
          
          <div className="postReact">
            <img 
              src={post._doc?.likedUser?.includes(localStorage.getItem("userId")) ? heartIcon : unlikeIcon} 
              alt="Like Button" 
              style={{ cursor: "pointer" }} 
              onClick={() => handleLikes(post)} 
            />
            <img 
              src={commentIcon} 
              alt="Comment Button" 
              style={{ cursor: "pointer" }} 
            />
            <img 
              src={shareIcon} 
              alt="Share Button" 
              style={{ cursor: "pointer" }} 
            />
          </div>

          <span style={{ color: 'var(--gray)', fontSize: '12px' }}>
            {post._doc?.likes} likes
          </span>

          <div className="detail">
            <span>
              <b>{post._doc?.name}</b>
            </span>
            <span>{post._doc?.desc ?? ""}</span>
          </div>
        </div>
      )) : <p>No posts available</p>}
    </div>
  );
};

export default Posts;
