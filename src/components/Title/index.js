import { FaChevronDown } from "react-icons/fa";
import avatar from "../../assets/images/avatar.png";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth";

export default function Title({ page, nameUser }) {
  const [imgUrl, setImgUrl] = useState();
  const {  userAuth } = useContext(AuthContext);

  useEffect(() => {
    const storedUrl = localStorage.getItem(`imgUrl_${userAuth}`);
    
    if (storedUrl) {
      setImgUrl(storedUrl);
    }
  })

  const user = {
    width: "225px",
    background: "#FFFFFF",
    borderRadius: "60px",
    height: "47px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: '1px solid #D7D7D7',
  };

  const titleContainer = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "1.5em",
    marginBottom: "1em",
    borderRadius: "5px",
    paddingTop: ".8em",
    paddingBottom: ".8em",
    justifyContent: "space-between",
  };

  const imgUserStyle = {
    width: "37px",
    height: "37px",
    borderRadius: "50%",
    objectFit: "cover",
  };

  const title = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "30px",
    lineHeight: "24px",
    letterSpacing: "0.101193px",
    color: "#476EE6",
  };

  const menuUser = {
    width: '100%',
    justifyContent: 'space-between',
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontFamily: 'Comfortaa',
    fontWeight: '400',
    fontSize: '17px',
    lineHeight: '16px',
    padding: '15px',
  };

  return (
    <div style={titleContainer}>
      <span style={title}>{page}</span>
      <div style={user}>
        <div style={menuUser}>
          <img style={imgUserStyle} src={typeof imgUrl === "undefined" ? avatar : imgUrl} alt="" />
          {nameUser}
          <FaChevronDown size={11} />
        </div>
      </div>
    </div>
  );
}
