import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import "./signup.css";

import logoCadastro from "../../assets/logoPn.png";
import stiveJobs from "../../assets/stiveJobs.png";

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

  return (
    <div>
      <div className="containerSignup">
        <div className="fundoStiveJobs">
          <img
            className="imgStiveJobs"
            src={stiveJobs}
            alt="Imagem de stivejobs"
          />
        </div>

        <div className="colunaCadastro">
          <div className="contentCadastro">
            <div className="logoCadastro">
              <img src={logoCadastro} alt="" />
            </div>

            <div className="container-title-cadastro">
              <h1>Cadastro</h1>
            </div>

            <form className="form-cadastro">
              <div className="containerInput">
                <label for="nome">Nome</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Insira seu nome"
                />
              </div>

              <div className="containerInput">
                <label for="email">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Insira um e-mail"
                />
              </div>

              <div className="containerInput">
                <label for="senha">Senha</label>
                <input
                  type="password"
                  id="senha"
                  name="senha"
                  placeholder="Insira senha"
                />
              </div>

              <div className="containerInput">
                <label for="confirmacao-senha">Confirmação de Senha</label>
                <input
                  type="password"
                  id="confirmacao-senha"
                  name="confirmacao-senha"
                  placeholder="Confirma senha"
                />
              </div>
            </form>
            <div className="titleTermosCompromisso">
              <strong>Termos de uso e privacidade</strong>
            </div>
            <div className="confirmaTermosCompromisso">
              <label className="inputCheckbox" for="checkbox">
                <input type="checkbox" id="checkbox" />
                Ao clicar neste botão, eu concordo com os termos de uso de
                privacidade da nosa empresa.
              </label>
            </div>
            <div className="termosPrivacidade">
              <a>Termos de uso e privacidade</a>
            </div>
            <div className="buttonCadastrar">
              <button>Cadastrar</button>
            </div>
            <div className="jaTemConta">
              Já tem uma conta? <a>Login</a>
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
