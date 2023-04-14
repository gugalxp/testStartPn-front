import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../../context/auth";
import logo from "../../../assets/images/logoPn.png";
import avatar from "../../../assets/images/avatar.png";

import { useHistory } from "react-router-dom";
import { HiMenuAlt2 } from "react-icons/hi";
import Navbar from "../../Navbar";

export default function HeaderMobile() {
  const { userAuth, urlImgUserAuth } = useContext(AuthContext);
  const [imgUrl, setImgUrl] = useState(urlImgUserAuth);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const history = useHistory();

  function handleOpenProfile(e) {
    e.preventDefault();

    history.push("/profile");
  }

  const imgUserStyle = {
    width: "37px",
    height: "37px",
    borderRadius: "50%",
    objectFit: "cover",
  };

  const handleNavbarToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div className="sidebarMobile">
      <HiMenuAlt2 size={35} color="#476ee6" onClick={handleNavbarToggle} />
      <img
        width="153px"
        height="38.27px"
        src={logo}
        alt="Foto avatar"
        onClick={handleOpenProfile}
      />
      <img
        onClick={handleOpenProfile}
        style={imgUserStyle}
        src={typeof imgUrl === "undefined" ? avatar : imgUrl}
        alt=""
      />

      {isNavbarOpen && (
        <div>
          <div className="navbar-overlay" onClick={handleNavbarToggle}></div>
          <Navbar />
        </div>
      )}
    </div>
  );
}
