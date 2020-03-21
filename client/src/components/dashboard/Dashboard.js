import React from "react";
import "./Dashboard.css";

import Navbar from "./Navbar";
import Trainings from "./Trainings";

const Dashboard = () => {
  return (
    <div className="dashbContainer">
      <Navbar />

      <Trainings />
    </div>
  );
};

export default Dashboard;
