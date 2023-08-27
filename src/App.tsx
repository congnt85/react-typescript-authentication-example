import React from "react";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import * as AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

import EventBus from "./common/EventBus";
import Home from "./components/Home";

const App: React.FC = () => {
  useEffect(() => {
    EventBus.on("logout", logOut);

    return () => {
      EventBus.remove("logout", logOut);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <nav className="navbar navbar-expand" style={{ borderBottom: '1px solid rgb(212, 212, 212)'}}>
        <div className="navbar-nav mr-auto">
          <span style={{ fontSize: 28 }}>
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Mizuho_logo.svg/1280px-Mizuho_logo.svg.png"
              style={{ 
                width: 100
              }}
              alt="Logo"
            />
            Identity Manager
          </span>
        </div>        
      </nav>

      <div className="container-fluid mt-3" style={{ height: '100vh' }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home/request" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} />
        </Routes>
      </div>

      <div className="p-3" style={{ borderTop: '1px solid rgb(212, 212, 212)'}}>
        © 2023 Copyright:
        <a className="text-dark" href="https://www.mizuhogroup.com/"> Mizuho Financial Group</a>
      </div>
    </div>
  );
};

export default App;
