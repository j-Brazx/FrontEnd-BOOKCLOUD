import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Fundo from "../../img/FundoLivros.webp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

  

const GlobalStyle = createGlobalStyle`
body{  
  background: 
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)),
    url(${Fundo});
  background-size: cover;
  background-position: center;
  height: 100vh;
  overflow-x: hidden;
}
`;

const Header = styled.header`
  background: linear-gradient(to right, #27387f, #3653c6);
  height: 10vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  padding: 0 20px;
`;

const Titulo = styled.h1`
  font-style: normal;
  font-weight: 750;
  font-size: 27px;
  line-height: 39px;
  color: white;
`;

const Text = styled.h1`
  font-style: normal;
  font-weight: 700;
  font-size: 80px;
  justify-self: center;
  color: white;
  margin-bottom: 5%;
  text-align: center;

  @media(max-width: 768px){
    font-size: 50px;
  }
`;

const Container = styled.div`
  background-color: white;
  width: 100vw;
  display: flex;
  flex-direction: row; 
  justify-content: space-around; 
  align-items: center; 
  min-height: 60vh;

  @media(max-width: 768px){
    flex-direction: column;
    padding: 20px ;
  }
`;

const Sobre = styled.div`
  background-color: #27387f;
  color: white;
  font-weight: 500;
  font-size: 20px;
  width: 300px;
  padding: 50px;
  margin: 2%;
  margin-left: 5%;
  height: 120%;
  margin-right: 240px;

  @media(max-width: 1024px){
    margin-right: 50px;
  }

  @media(max-width: 768px){
    width: 90%;
    margin: 0 0 20px 0;
    padding: 20px;
    height: auto;
  }
`;

const Preparado = styled.div`
  flex: 1;
  text-align: center;
  border: none;
  border-left: 3px solid #27387F;

  @media(max-width: 768px){
    border-left: none;
  }
`;

const Input = styled.input`
  text-decoration: none;
  border: none;
  border-bottom: 5px solid #27387F;
  width: 80%;
  height:40px;
  outline: none;
`;

const Botao= styled.button`
  background-color: #27387F;
  color: white;
  font-size: 24px;
  border: none;
  padding: 15px;
  width: 200px;
  margin: 13px;

  &:hover {
    background: #1d2b5c;
  }
`;

const H1 = styled.h1`
  font-weight: 900;
  font-size:50px;
`;

const H2 = styled.h1`
  font-size:24px;
`;

const Botao2 = styled.button`
  background-color: #27387F;
  color: white;
  font-size: 19px;
  border: none;
  padding: 10px;
  width: 110px;
  margin-right: 100px;

  &:hover {
    background: #1d2b5c;
  }

  @media(max-width: 768px){
    margin-right: 20px;
  }
`;

export default function Home() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const Cadastro = () => {
    navigate("/criar", { state: { email } });
  };
  const Login = () =>{
    navigate("/login")
  }
  return (
    <>
      <GlobalStyle />
      <Header>
        <Titulo>BOOKCLOUD</Titulo>
        <Botao2 onClick={Login}>Entrar</Botao2>
      </Header>
      <Text>Biblioteca Virtual</Text>
      <Container>
        <Sobre>
          Navegue por centenas de <br/>
          títulos e reserve seus livros <br/>
          favoritos com
          praticidade. Ao confirmar a reserva, o exemplar fica automaticamente
          reservado para retirada ou leitura online. Simples, rápido e seguro!{" "}
          <hr />
        </Sobre>
        <Preparado>
          <H1>Preparado para Ler?</H1>
          <H2>Cadastre-se em nossa biblioteca ou entre em sua conta</H2>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Insira seu email"/><br/>
          <Botao onClick={Cadastro}>Vamos Lá!</Botao>
        </Preparado>
      </Container>
    </>
  );
}
