import React from "react";
import Header from "../../components/Header";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth";

const DashboardColumnLayout = ({ colum2Data }) => {

  const { isOpenHeaderMobile } =
  useContext(AuthContext);

  const containerMain = {
    display: "grid",
    gridTemplateColumns:
      "229px 1fr",
    gridColumnGap: "0px",
    gridRowGap: "0px",
  };

  return (
    <div style={containerMain} className="containerMain">
      <div className={!isOpenHeaderMobile ? "headerContainer" : ""}>
        <Header />
      </div>
      <div className="contentMain">{colum2Data}</div>
    </div>
  );
};

export default DashboardColumnLayout;
