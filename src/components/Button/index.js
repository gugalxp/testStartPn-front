
export default function Button({containerButton, buttonStyle, conteudo}){

  return(
    <div style={containerButton}>
        <button style={buttonStyle}>{conteudo}</button>
    </div>
  )
}