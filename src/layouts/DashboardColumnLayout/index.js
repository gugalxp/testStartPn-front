import React from "react";

const DashboardColumnLayout = ({ colum2Data }) => {
  const containerMain = {
    marginLeft: '280px',
    marginRight: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  return (
    <div style={containerMain}>
        {colum2Data}
    </div>
  );
};

export default DashboardColumnLayout;
