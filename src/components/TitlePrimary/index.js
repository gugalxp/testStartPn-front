
export default function TitlePrimary({conteudo, containerTitle}) {
  
  const titlePrimary = {
    color: "#476ee6",
    fontSize: "24px",
    lineHeight: "36px",
    fontWeight: "500",
  };

  return (
    <div style={containerTitle}>
      <div style={titlePrimary}>{conteudo}</div>
    </div>
  );
}
