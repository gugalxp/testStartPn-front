import logoCadastroImg from "../../assets/images/logoPn.png";

export default function TitlePrimary({conteudo, containerTitle}) {
  
  const titlePrimary = {
    color: "#476ee6",
    fontSize: "24px",
    lineHeight: "36px",
    fontWeight: "500",
  };

  return (
    <div style={containerTitle}>
      <h1 style={titlePrimary}>{conteudo}</h1>
    </div>
  );
}
