import stiveJobsImg from "../../assets/images/stiveJobs.png";

export default function ArteVisual() {

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
      <img
        style={styleImgStiveJobs}
        src={stiveJobsImg}
        alt="Imagem de stivejobs"
      />
  );
}
