import { FaChevronDown } from "react-icons/fa";
import avatar from "../../assets/images/avatar.png";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth";
import { useHistory } from "react-router-dom";

export default function Title({ page, nameUser }) {
  const [imgUrl, setImgUrl] = useState();
  const { userAuth } = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    const storedUrl = localStorage.getItem(`imgUrl_${userAuth}`);

    if (storedUrl) {
      setImgUrl(storedUrl);
    }
  });

  function handleOpenProfile(e) {
    e.preventDefault();

    history.push("/profile")
  }

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
    cursor: "pointer",
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

  return (
    <div style={titleContainer} onClick={handleOpenProfile} >
      <span style={title} >{page}</span>
      <div className="user">
        <div className="containerUser">
          <img
            style={imgUserStyle}
            src={typeof imgUrl === "undefined" ? avatar : imgUrl}
            alt=""
          />
          <div className="userName">{nameUser}</div>
          <div className="iconMenuUser">
            <FaChevronDown size={11} />
          </div>
        </div>
      </div>
    </div>
  );
}
