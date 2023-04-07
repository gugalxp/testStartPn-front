import React from "react";
import ArteVisual from "../../components/ArteVisual";
import fundoStiveJobsImg from "../../assets/images/fundoStiveJobs.png";

const BeforeLoggerColumnLayout = ({ colum2Data, page }) => {

  const column1 = {
    position: "relative",
    top: "0",
    left: "0",
    objectFit: "cover",
    backgroundSize: "cover",
    backgroundImage: "url(" + fundoStiveJobsImg + ")",
    borderTopRightRadius: "30px",
    backgroundPositionX: "-2em",
    backgroundPositionY: "0.6em",
    width: "667px",
    height: "100vh",
  };

  const column2 = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
  };

  return (
    <div className="containerMain">
      <div className="showArteVisual">
        <div style={column1}>
          <ArteVisual />
        </div>
      </div>

      <div style={column2}>{colum2Data}</div>
    </div>
  );
};

export default BeforeLoggerColumnLayout;
