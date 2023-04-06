import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth";
import logo from "../../assets/images/logoPn.png";

import { Link, useLocation } from "react-router-dom";
import {
  FiUser,
  FiSettings,
  FiAlertTriangle,
  FiUsers,
  FiAnchor,
  FiLogOut,
} from "react-icons/fi";

export default function Header() {
  const { user, signOut } = useContext(AuthContext);

  const location = useLocation();

  const items = {
    display: "block",
    padding: "16px",
    width: "205px",
    textDecoration: "none",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: "#787486",
  };

  const itemActive = {
    background: "#F7F9FB",
    color: "#476EE6",
    borderRadius: "8px",
    display: "block",
    padding: "16px",
    width: "205px",
    textDecoration: "none",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  };

  const containerItens = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  };

  const containerLogOut = {
    ...items,
    marginTop: "80px",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  };



  const containerLogo = {
    paddingTop: "30px",
  };

  const styleLogo = {
    display: "block",
    margin: "auto",
    width: "153px",
    height: "38.27px",
    objectFit: "cover",
    marginBottom: "52px",
  };

  const icon = {
    marginRight: ".8em",
  };

  return (
    <div className="sidebar">
      <div style={containerLogo}>
        <img style={styleLogo} src={logo} alt="Foto avatar" />
      </div>

      <div style={containerItens}>
        <Link
          to="/dashboard"
          style={location.pathname == "/dashboard" ? itemActive : items}
        >
          <FiUsers
            style={icon}
            color={location.pathname == "/dashboard" ? "#476EE6" : "#787486"}
            size={24}
          />
          Terceiros
        </Link>
        <Link style={location.pathname == "/ancora" ? itemActive : items}>
          <FiAnchor
            style={icon}
            color={location.pathname == "/ancora"  ? "#476EE6" : "#787486"}
            size={24}
          />
          Exemplo
        </Link>

        <Link
          style={location.pathname == "/alert" ? itemActive : items}
        >
          <FiAlertTriangle
            style={icon}
            color={location.pathname == "/alert"  ? "#476EE6" : "#787486"}
            size={24}
          />
          Exemplo
        </Link>

        <Link
          style={location.pathname == "/setting" ? itemActive : items}
        >
          <FiSettings
            style={icon}
            color={location.pathname == "/setting" ? "#476EE6" : "#787486"}
            size={24}
          />
          Exemplo
        </Link>
        <Link
          to="/profile"
          style={location.pathname == "/profile" ? itemActive : items}
        >
          <FiUser
            color={location.pathname == "/profile" ? "#476EE6" : "#787486"}
            style={icon}
            size={24}
          />
          Minha conta
        </Link>
        <Link style={containerLogOut} onClick={signOut}>
          <FiLogOut color="#787486" style={icon} size={24} />
          Sair
        </Link>
      </div>
    </div>
  );
}
