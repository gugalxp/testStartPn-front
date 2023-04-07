import logoCadastroImg from "../../assets/images/logoPn.png";

export default function Logo({ containerLogo }) {
  const logo = {
    width: "190px",
    height: "47.74px",
  };

  return (
      <div className={containerLogo}>
        <img style={logo} src={logoCadastroImg} alt="logo cadastro" />
      </div>
  );
}
