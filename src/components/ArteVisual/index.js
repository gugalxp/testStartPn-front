import stiveJobsImg from "../../assets/images/stiveJobs.png";

export default function ArteVisual() {

  const styleImgStiveJobs = {
    position: "absolute",
    objectFit: "cover",
    width: "667px",
    height: "547px",
    left: "0px",
    bottom: "0",
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
