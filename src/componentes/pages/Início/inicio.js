import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import Fundo from "../../img/FundoLivros.webp";
import axios from "axios";

const GlobalStyle = createGlobalStyle`
body {  
  background: 
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.3)),
    url(${Fundo});
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  margin: 0;
  overflow-x: hidden;
  font-family: sans-serif;
}
`;

const Quadro = styled.div`
  background-color: #3653c6;
  width: 55%;
  max-width: 1200px;
  min-height: 230px;
  margin: 5% auto 3%;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

const QuadroRight = styled.div`
  background-color: #27387f;
  width: 90%;
  min-height: 150px;
  border-radius: 25px;
  text-align: center;
  padding: 15px;
  margin-bottom: 20px;
  @media (min-width: 768px) {
    margin-bottom: 0;
  }
`;

const QuadroLeft = styled.div`
  background-color: #27387f;
  width: 90%;
  max-width: 400px;
  min-height: 150px;
  border-radius: 25px;
  text-align: center;
  padding: 15px;
`;

const Container = styled.div`
  background-color: white;
  width: 100vw;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
`;

const Branco = styled.div`
  width: 80%;
  max-width: 350px;
  height: 50px;
  background-color: white;
  border-radius: 100px;
  margin: 15px auto;
  display: flex;
  align-items: center;
`;

const Verde = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 100%;
  background-color: #34ba3a;
`;

const Vermelho = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 100%;
  background-color: #ce1f22;
`;

const Text = styled.h2`
  font-size: 1.2rem;
  color: white;
  font-weight: 700;
  line-height: 1.3;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const H2 = styled.h2`
  font-size: 1.2rem;
  color: black;
  font-weight: 700;
  line-height: 1.3;
  padding: 10px;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const FabContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainButton = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: none;
  background-color: rgba(54, 82, 196, 1);
  color: white;
  font-size: 32px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #27387f;
    transform: scale(1.05);
  }
`;

const OptionButton = styled.button`
  height: 30px;
  border-radius: 5px;
  border: none;
  background-color: #ffffffff;
  color: white;
  font-size: 24px;
  cursor: pointer;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 6px rgba(54, 82, 196, 0.8);
  transform: ${(props) => (props.open ? "scale(1)" : "scale(0)")};
  opacity: ${(props) => (props.open ? 1 : 0)};
  transition: all 0.2s ease-in-out;
`;
const Option = styled.h3`
  color: rgba(54, 82, 196, 0.8);
  font-size: 17px;
`;

const Div = styled.div`
  width: 150px;
  margin: 15px;
  text-align: center;
  border-radius: 15px;
  padding: 10px;
  position: relative;
   transition: transform 0.25s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const Img = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 30px;
`;

const StatusCircle = styled.div`
  width: 40px;
  height: 40px; 
  border-radius: 50%;
  background-color: ${(props) => (props.livre ? "#34ba3a" : "#ce1f22")};
  position: absolute;
  bottom: 25px;   
  left: 135px;  
`;

export default function Inicio() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [livros, setLivros] = useState([]);

  useEffect(() => {
  axios.get("http://localhost:3000/livros/acervolivros")
    .then((res) => {
      const livrosComImagem = res.data.map((livro) => {
        let imagemBase64 = null;

        if (livro.imagem?.data) { 
          const bytes = new Uint8Array(livro.imagem.data);
          let binary = "";
          bytes.forEach((b) => (binary += String.fromCharCode(b)));
          imagemBase64 = `data:image/jpeg;base64,${btoa(binary)}`;
        }

        return {
          ...livro,
          imagem: imagemBase64,
        };
      });

      setLivros(livrosComImagem);
    })
    .catch((err) => console.error("Erro ao buscar livros:", err));
}, []);


  return (
    <>
      <GlobalStyle />
      <Quadro>
        <QuadroLeft>
          <Branco>
            <Vermelho />
            <H2>Em emprestimo</H2>
          </Branco>
          <Branco>
            <Verde />
            <H2>Disponível</H2>
          </Branco>
        </QuadroLeft>
        <QuadroRight>
          <Text>
            ATENÇÃO
            <br />
            Horário de Funcionamento-
            <br />
            08h00 às 16h00
          </Text>
        </QuadroRight>
      </Quadro>
      <Container>
  {livros.map((livro) => (
    <Div key={livro.id} onClick={() => navigate(`/sinopse/${livro.id}`)}>
      {livro.imagem && (
        <Img src={livro.imagem} alt={livro.nome} />
      )}

      <StatusCircle livre={livro.status === "livre"} />
    </Div>
  ))}
</Container>

      <FabContainer>
        <OptionButton open={open} onClick={() => navigate("/cadastrar-livro")}>
          <Option>Novo Exemplar</Option>
        </OptionButton>
        <OptionButton open={open} onClick={() => navigate("/excluir")}>
          <Option>Excluir Exemplar</Option>
        </OptionButton>
        <MainButton onClick={() => setOpen(!open)}>
          {open ? "×" : "+"}
        </MainButton>
      </FabContainer>
    </>
  );
}
