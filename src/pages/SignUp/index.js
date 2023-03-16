import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import Button from "../../components/Button";
import ArteVisual from "../../components/ArteVisual";
import Logo from "../../components/Logo";
import TitlePrimary from "../../components/TitlePrimary";

function SignUp() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp, loadingAuth } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmaPassword, setShowConfirmaPassword] = useState(false);

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

  const column2 = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
  };

  const containerColumn2 = {
    marginTop: "0",
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
    fontSize: "14px",
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
    width: "561px",
  };

  const containerTermosPrivacidade = {
    marginBottom: "30px",
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
    width: "100%",
    display: "flex",
    justifyContent: "center",
  };

  const button = {
    background: "#476ee6",
    border: "none",
    width: "180px",
    height: "45.37px",
    borderRadius: "60px",
    color: "#fff",
    lineHeight: "20px",
    fontWeight: "600",
    fontSize: "15px",
    fontStyle: "normal",
  };

  const containerInputIcon = {
    position: "relative",
  };

  const icon = {
    position: "absolute",
    right: "3%",
    top: "25%",
    cursor: "pointer",
  };

  return (
    <div className="containerCadastro">
      <div style={containerMain}>
        <ArteVisual />

        <div style={column2}>
          <div style={containerColumn2}>
            <Logo containerLogo={{ width: "100%", marginBottom: "25px" }} />
            <TitlePrimary
              containerTitle={{ fontStyle: "normal" }}
              conteudo="Cadastrar"
            />

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
                <div style={containerInputIcon}>
                  <input
                    style={input}
                    type={showPassword ? "text" : "password"}
                    id="senha"
                    name="senha"
                    placeholder="Insira senha"
                  />
                  {showPassword ? (
                    <BsEyeSlash
                      style={icon}
                      size={24}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <BsEye
                      style={icon}
                      size={24}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
              </div>

              <div style={containerInput}>
                <label style={label} for="confirmacao-senha">
                  Confirmação de Senha
                </label>
                <div style={containerInputIcon}>
                  <input
                    style={input}
                    type={showConfirmaPassword ? "text" : "password"}
                    id="confirmacao-senha"
                    name="confirmacao-senha"
                    placeholder="Confirma senha"
                  />
                  {showPassword ? (
                    <BsEyeSlash
                      style={icon}
                      size={24}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <BsEye
                      style={icon}
                      size={24}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
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
              Já tem uma conta?
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
