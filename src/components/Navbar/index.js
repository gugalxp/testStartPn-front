import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { HiOutlineLogout } from "react-icons/hi";
import Logo from "../../assets/images/logoPn.png";
import {
  FiUser,
  FiSettings,
  FiAlertTriangle,
  FiUsers,
  FiAnchor,
  FiLogOut,
} from "react-icons/fi";
const Navbar = ({ isOpen, toggle }) => {
  const { userAuth, signOut } = useContext(AuthContext);
  const location = useLocation();

  const imgUserStyle = {
    width: "200px",
    objectFit: "cover",
    marginTop: "50px",
    marginBottom: "50px",
  };

  const items = {
    display: "block",
    paddingRight: "16px",
    paddingBottom: "16px",
    paddingTop: "16px",
    width: "205px",
    textDecoration: "none",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: "#787486",
  };

  const icon = {
    marginRight: ".8em",
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
    flexDirection: "column",
  };

  const containerLogOut = {
    ...items,
    marginTop: "80px",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  };

  const styleLogo = {
    display: "block",
    margin: "auto",
    width: "153px",
    height: "38.27px",
    objectFit: "cover",
    marginBottom: "52px",
  };

  return (
    <nav className={isOpen ? "navbar open" : "navbar"}>
      <div className="navbar-container">
        <div className="navbar-header">
          <Link to="/">
            <img
              src={Logo}
              alt="User avatar"
              className="navbar-avatar"
              style={imgUserStyle}
            />
          </Link>

          <div style={containerItens}>
            <Link
              to="/dashboard"
              style={location.pathname == "/dashboard" ? itemActive : items}
            >
              <FiUsers
                style={icon}
                color={
                  location.pathname == "/dashboard" ? "#476EE6" : "#787486"
                }
                size={24}
              />
              Terceiros
            </Link>
            <Link style={location.pathname == "/ancora" ? itemActive : items}>
              <FiAnchor
                style={icon}
                color={location.pathname == "/ancora" ? "#476EE6" : "#787486"}
                size={24}
              />
              Exemplo
            </Link>

            <Link style={location.pathname == "/alert" ? itemActive : items}>
              <FiAlertTriangle
                style={icon}
                color={location.pathname == "/alert" ? "#476EE6" : "#787486"}
                size={24}
              />
              Exemplo
            </Link>

            <Link style={location.pathname == "/setting" ? itemActive : items}>
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
      </div>
    </nav>
  );
};

export default Navbar;
