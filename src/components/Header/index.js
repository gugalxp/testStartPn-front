import { useContext } from "react";
import "./header.css";
import { AuthContext } from "../../context/auth";
import logo from "../../assets/images/logoPn.png";

import { Link } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiSettings,
  FiAlertTriangle,
  FiUsers,
  FiAnchor,
  FiLogOut,
} from "react-icons/fi";
import Dashboard from "../../pages/Dashboard";


export default function Header() {
  const { user } = useContext(AuthContext);

  const items = {
    display: "block",
    padding: "16px",
    width: "205px",
    textDecoration: "none",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: '#787486',
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

  const sidebar = {
    margin: 0,
    padding: 0,
    width: "229px",
    background: "#FFFFFF",
    position: "fixed",
    height: "100%",
    overflow: "auto",
    borderTopRightRadius: '30px',
    borderBottomRightRadius: '30px',
    borderRight: '1px solid #D7D7D7',
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
    marginRight: '.8em'
  }

  return (
    <div style={sidebar}>
      <div style={containerLogo}>
        <img style={styleLogo} src={logo} alt="Foto avatar" />
      </div>

      <div style={containerItens}>
        <Link to="/dashboard" style={itemActive}>
          <FiUsers style={icon} color="#476EE6" size={24} />
          Terceiros
        </Link>
        <Link to="/customers" style={items}>
          <FiAlertTriangle style={icon} color="#787486" size={24} />
          Exemplo
        </Link>
        <Link to="/profile" style={items}>
          <FiAnchor style={icon} color="#787486" size={24} />
          Exemplo
        </Link>
        <Link to="/profile" style={items}>
          <FiSettings style={icon} color="#787486" size={24} />
          Exemplo
        </Link>
        <Link to="/profile" style={items}>
          <FiUser color="#787486" style={icon} size={24} />
          Minha conta 
        </Link>
        <Link style={containerLogOut}>
          <FiLogOut color="#787486" style={icon} size={24} />
          Sair
        </Link>
      </div>
    </div>
  );
}
