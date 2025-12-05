import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Fundo from "../../img/FundoLivros.webp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
body{  
  background: 
      linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
      url(${Fundo});
  background-size: cover;
  background-position: center;
  height: 100vh;
  overflow-x: hidden;
  margin: 0;
  font-family: Arial, sans-serif;
}
`;

const Header = styled.header`
  background: linear-gradient(to right, #27387f, #3653c6);
  height: 10vh;
  width: 100vw;
  display: flex;
  align-items: center;
  padding-left: 20px;
`;

const Titulo = styled.h1`
  font-weight: 750;
  font-size: 27px;
  color: white;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
`;

const Card = styled.div`
  display: flex;
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 6px 18px rgba(0, 0, 0, 0.3);
  width: 800px;
  max-width: 95%;
  height: 450px;
`;

const FormSection = styled.form`
  padding: 40px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const TituloForm = styled.h2`
  font-size: 34px;
  margin-bottom: 20px;
  font-weight: 900;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 12px;
  border: none;
  border-radius: 2px;
  background: #f0f0f0;
  font-size: 15px;
  border-bottom: 3px solid #27387f;
  outline: none;
`;

const Botao = styled.button`
  padding: 14px;
  background: #27387f;
  color: white;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: background 0.3s;

  &:hover {
    background: #1d2b5c;
  }
`;

const WelcomeSection = styled.div`
  background: linear-gradient(to bottom, #27387f, #3653c6);
  color: white;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50px;
  font-weight: 900;
  text-align: center;
  padding: 30px;
  border-radius: 130px 10px 10px 130px;
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const executaSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const resposta = await fetch("http://localhost:3000/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });
      const dados = await resposta.json();

      if (resposta.ok) {
        //alert('Login bem-sucedido');
        console.log("Dados da API", dados);
        localStorage.setItem("usuario", JSON.stringify(dados.usuario));
        localStorage.setItem("role", dados.usuario.tipo_usuario);
        localStorage.setItem("id", dados.usuario.id);
        navigate("/inicio");
      } else {
        setError(dados.message || "Erro ao fazer Login. Tente novamente");
      }
    } catch (erro) {
      console.log("Falha ao conectar a API", erro);
      setError(
        "Não foi possível conectar ao servidor. Verifique sua conexão" + erro
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <GlobalStyle />
      <Header>
        <Titulo>BOOKCLOUD</Titulo>
      </Header>
      <Container>
        <Card>
          <FormSection onSubmit={executaSubmit}>
            <TituloForm>Login</TituloForm>
            <Input
              type="text"
              className="form-control"
              id="email"
              name="email"
              placeholder="Insira seu E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              className="form-control"
              id="senha"
              name="senha"
              placeholder="Insira sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <Botao type="submit">Entrar</Botao>
          </FormSection>
          <WelcomeSection>
            <p>Bem Vindo</p>
          </WelcomeSection>
        </Card>
      </Container>
    </>
  );
}
