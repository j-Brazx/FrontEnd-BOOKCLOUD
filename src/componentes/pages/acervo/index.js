import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useNavigate } from "react-router-dom";
import Fundo from "../../img/FundoLivros.webp";
import axios from "axios";

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

export default function Acervo() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/livros/acervolivros")
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
    <Container>
      {livros.map((livro) => (
        <Div key={livro.id}>
          {livro.imagem && <Img src={livro.imagem} alt={livro.nome} />}

          <StatusCircle livre={livro.status === "livre"} />
        </Div>
      ))}
    </Container>
  );
}
