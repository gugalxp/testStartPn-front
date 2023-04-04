import React from "react";
import Header from "../../components/Header";

const DashboardColumnLayout = ({ colum2Data }) => {
  const contentMain = {
    marginLeft: "50px",
    marginRight: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  };

  const containerMain = {
    display: "grid",
    gridTemplateColumns:
      "229px 1fr",
    gridColumnGap: "0px",
    gridRowGap: "0px",
  };

  return (
    <div style={containerMain} className="containerMain">
      <div className="headerContainer">
        <Header />
      </div>
      <div style={contentMain}>{colum2Data}</div>
    </div>
  );
};

export default DashboardColumnLayout;
