
export default function Button({containerButton, buttonStyle, conteudo, handle}){

  return(
    <div style={containerButton}>
        <button onClick={handle} style={buttonStyle}>{conteudo}</button>
    </div>
  )
}