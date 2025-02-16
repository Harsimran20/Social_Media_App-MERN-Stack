import React, { useState, useEffect } from 'react';
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";

const Auth = () => {
  return (
    <div className="Auth">
      <LogIn />
    </div>
  );
};

function LogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      localStorage.removeItem("userId");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const formData = { username, password };
    console.log("FormData", formData);

    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const resp = await response.json();
        localStorage.setItem("userId", resp.data._id);
        localStorage.setItem("image", resp.data.image);
        localStorage.setItem("followersList", resp.data.followersList);
        localStorage.setItem("name", resp.data.firstName + ' ' + resp.data.lastName);
        navigate("/home");
        console.log("User Logged in successfully", resp.data);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="a-right">
      <form className="infoForm authForm" onSubmit={handleLogin}>
        <h3>Log In</h3>
        <div>
          <input 
            type="text" 
            placeholder="Username" 
            className="infoInput" 
            name="username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div>
          <input 
            type="password" 
            placeholder="Password" 
            className="infoInput" 
            name="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <div>
          <span style={{ fontSize: "12px" }}>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </span>
        </div>
        <div>
          <button className="button infoButton">Login</button>
        </div>
      </form>
    </div>
  );
}

const SignUp = () => {
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      localStorage.removeItem("userId");
    }
  }, []);

  return <Authenticate />;
};

function Authenticate() {
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstName, setFirstName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    // Signup logic goes here...
  };

  return (
    <form onSubmit={handleSignup}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export { Auth, SignUp };
