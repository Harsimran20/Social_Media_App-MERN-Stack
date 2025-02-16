import "./App.css";
import { Auth, SignUp } from "./pages/Auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/Profile/Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Correctly structured routes */}
        <Route
          path="/"
          element={
            <div className="App">
              <div className="blur" style={{ top: "-18%", right: "0" }}></div>
              <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
              <Auth /> {/* Correctly placed Auth component */}
            </div>
          }
        />
        <Route
          path="profile"
          element={
            <div className="App">
              <div className="blur" style={{ top: "-18%", right: "0" }}></div>
              <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
              <Profile/> {/* Correctly placed Auth component */}
            </div>
          }
        />
        <Route
          path="home"
          element={
            <div className="App">
              <div className="blur" style={{ top: "-18%", right: "0" }}></div>
              <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
              <Home/> {/* Correctly placed Auth component */}
            </div>
          }
        />
        <Route
          path="signup"
          element={
            <div className="App">
              <div className="blur" style={{ top: "-18%", right: "0" }}></div>
              <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
              <SignUp/> {/* Correctly placed Auth component */}
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

