import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import "./signup.css";

import logoCadastroImg from "../../assets/logoPn.png";
import stiveJobsImg from "../../assets/stiveJobs.png";
import fundoStiveJobsImg from "../../assets/fundoStiveJobs.png";

import Button from "../../components/Button";

function SignUp() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp, loadingAuth } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();

    if (nome !== "" && email !== "" && password !== "") {
      signUp(email, password, nome);
    }
  }

  const containerMain = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr" /* cria duas colunas com a mesma largura */,
    gridColumnGap: "0px",
    gridRowGap: "0px",
    background: "#fff",
  };

  const columun1 = {
    position: "relative",
    top: "0",
    left: "0",
    objectFit: "cover",
    backgroundSize: "cover",
    backgroundImage: "url(" + fundoStiveJobsImg + ")",
    borderTopRightRadius: "30px",
    backgroundPositionX: "-8.4em",
    width: "667px",
    height: "812px",
  };

  const styleImgStiveJobs = {
    position: "absolute",
    objectFit: "cover",
    width: "667px",
    height: "676.67px",
    left: "0px",
    top: "135.33px",
    backgroundSize: "cover",
  };

  const column2 = {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    paddingRight: "30px",
    paddingLeft: "40px",
  };

  const containerColumn2 = {
    marginTop: "88px",
  };

  const containerLogo = {
    width: "100%",
  };

  const logo = {
    width: "190px",
    height: "47.74px",
    marginBottom: "48.6px",
  };

  const containerTitle = {
    width: "100%",
    marginBottom: "27px",
  };

  const titlePrimary = {
    color: "#476ee6",
    fontSize: "24px",
    lineHeight: "36px",
    fontWeight: "500",
  };

  const form = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridTemplateRows: "repeat(2, auto)",
    gap: "1rem",
    marginBottom: "35.4px",
  };

  const containerInput = {
    display: "flex",
    flexDirection: "column",
  };

  const input = {
    borderRadius: "10px",
    width: "290px",
    height: "50.06px",
    border: "1px solid #d7d7d7",
    background: "#fff",
    padding: "10px",
  };

  const label = {
    marginBottom: "14.6px",
    color: "#000000",
    fontWeight: "400",
  };

  const containerTitleTermosPrivacidade = {
    marginBottom: "21.3px",
  };

  const titleTermoPrivacidade = {
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "600",
  };

  const containerConfirmaTermosPrivacidade = {
    marginBottom: "6.1px",
  };

  const inputCheckbox = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "2em",
    fontSize: "13px",
    fontWeight: "500",
    marginLeft: "10px",
    cursor: "pointer",
    gap: "10px",
  };

  const containerTermosPrivacidade = {
    marginBottom: "63.8px",
  };

  const lerTermosPrivacidade = {
    color: "#476ee6",
    cursor: "pointer",
    marginLeft: "2em",
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: "500",
  };

  const jaTemConta_Logar = {
    color: "#476ee6",
    cursor: "pointer",
    fontWeight: "500",
  };

  const jaTemConta = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "1em",
    gap: "15px",
    alignItems: "center",
    fontWeight: "500",
    color: "#3C3C43",
    lineHeight: "22.5px",
    fontSize: "15px",
    textAlign: "center",
  };

  const containerButton = {
    marginTop: "1rem",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  };

  const button = {
    background: "#476ee6",
    border: "none",
    width: "267px",
    height: "45.37px",
    borderRadius: "60px",
    color: "#fff",
    lineHeight: "20px",
    fontWeight: "600",
  };

  return (
    <div>
      <div style={containerMain}>
        <div style={columun1}>
          <img
            style={styleImgStiveJobs}
            src={stiveJobsImg}
            alt="Imagem de stivejobs"
          />
        </div>

        <div style={column2}>
          <div style={containerColumn2}>
            <div style={containerLogo}>
              <img style={logo} src={logoCadastroImg} alt="logo cadastro" />
            </div>

            <div style={containerTitle}>
              <h1 style={titlePrimary}>Cadastro</h1>
            </div>

            <form style={form}>
              <div style={containerInput}>
                <label style={label} for="nome">
                  Nome
                </label>
                <input
                  style={input}
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Insira seu nome"
                />
              </div>

              <div style={containerInput}>
                <label style={label} for="email">
                  E-mail
                </label>
                <input
                  style={input}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Insira um e-mail"
                />
              </div>

              <div style={containerInput}>
                <label style={label} for="senha">
                  Senha
                </label>
                <input
                  style={input}
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder="Insira senha"
                />
              </div>

              <div style={containerInput}>
                <label style={label} for="confirmacao-senha">
                  Confirmação de Senha
                </label>
                <input
                  style={input}
                  type="password"
                  id="confirmacao-senha"
                  name="confirmacao-senha"
                  placeholder="Confirma senha"
                />
              </div>
            </form>
            <div style={containerTitleTermosPrivacidade}>
              <strong style={titleTermoPrivacidade}>
                Termos de uso e privacidade
              </strong>
            </div>
            <div style={containerConfirmaTermosPrivacidade}>
              <label style={inputCheckbox} for="checkbox">
                <input type="checkbox" id="checkbox" />
                Ao clicar neste botão, eu concordo com os termos de uso de
                privacidade da nosa empresa.
              </label>
            </div>
            <div style={containerTermosPrivacidade}>
              <a style={lerTermosPrivacidade}>Termos de uso e privacidade</a>
            </div>
            <Button
              containerButton={containerButton}
              buttonStyle={button}
              conteudo="Cadastrar"
            ></Button>
            <div style={jaTemConta}>
              Já tem uma conta?{" "}
              <Link style={jaTemConta_Logar} to="/">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="container-center">
    //   <div className="login">
    //     <div className="login-area">
    //       <img src={logo} alt="Sistema Logo" />
    //     </div>

    //     <form onSubmit={handleSubmit}>
    //       <h1>Cadastrar uma conta</h1>
    //       <input type="text" placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
    //       <input type="text" placeholder="email@email.com" value={email} onChange={ (e) => setEmail(e.target.value) }/>
    //       <input type="password" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value) } />
    //       <button type="submit">{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
    //     </form>

    //     <Link to="/">Já tem uma conta? Entre</Link>
    //   </div>
    // </div>
  );
}

export default SignUp;
