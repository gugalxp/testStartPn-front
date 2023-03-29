import React from "react";
import ArteVisual from "../../components/ArteVisual";
import fundoStiveJobsImg from "../../assets/images/fundoStiveJobs.png";

const BeforeLoggerColumnLayout = ({ colum2Data, page }) => {
  const containerMain = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr" /* cria duas colunas com a mesma largura */,
    gridColumnGap: "0px",
    gridRowGap: "0px",
    background: "#fff",
  };

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
    <div style={containerMain}>
      <div style={column1}>
        <ArteVisual />
      </div>
      {/* End column1*/}

      <div style={column2}>{colum2Data}</div>
      {/* End column2 */}
    </div>
  );
};

export default BeforeLoggerColumnLayout;
