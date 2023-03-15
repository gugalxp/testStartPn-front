import stiveJobsImg from "../../assets/images/stiveJobs.png";
import fundoStiveJobsImg from "../../assets/images/fundoStiveJobs.png";

export default function ArteVisual() {
  const columun1 = {
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

  const styleImgStiveJobs = {
    position: "absolute",
    objectFit: "cover",
    width: "667px",
    height: "500px",
    left: "0px",
    top: "135.33px",
    backgroundSize: "cover",
  };

  return (
    <div style={columun1}>
      <img
        style={styleImgStiveJobs}
        src={stiveJobsImg}
        alt="Imagem de stivejobs"
      />
    </div>
  );
}
