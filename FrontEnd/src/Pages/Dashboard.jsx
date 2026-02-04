import React from "react";

const Dashboard = () => {
  return (
    <div style={{ padding: 40 }}>
      <h1>Dashboard (Protected)</h1>
      <p>This route is protected by <code>PrivateRoute</code>.</p>
    </div>
  );
};

export default Dashboard;
