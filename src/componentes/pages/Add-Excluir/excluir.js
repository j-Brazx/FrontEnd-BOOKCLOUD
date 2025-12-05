import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Fundo from "../../img/FundoLivros.webp";
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
  width: 700px;
  max-width: 95%;
  padding: 40px;
  flex-direction: column;
`;

const TituloForm = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: 800;
  text-align: center;
`;

const Lista = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-top: 20px;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background: #f0f0f0;
  border-left: 5px solid #27387f;
  border-radius: 5px;
`;

const Nome = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

const BotaoVoltar = styled.button`
  padding: 10px 18px;
  background: #27387f;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  margin-bottom: 5px;
  transition: 0.3s;
  width: 120px;

  &:hover {
    background: #1d2b5c;
  }
`;

const BotaoExcluir = styled.button`
  padding: 10px 18px;
  background: #c62828;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 15px;
  transition: 0.3s;

  &:hover {
    background: #8e1d1d;
  }
`;

export default function ExcluirLivros() {
  const [livros, setLivros] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const resposta = await fetch(
          "http://localhost:3000/livros/acervolivros"
        );
        const dados = await resposta.json();
        setLivros(dados);
      } catch (e) {
        console.error(e);
        setErro("Erro ao carregar livros.");
      }
    };
    fetchLivros();
  }, []);

  const deletarLivro = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este livro?")) return;

    try {
      setLoading(true);
      const resposta = await fetch(
        `http://localhost:3000/livros/deletarlivros/${id}`,
        {
          method: "DELETE",
        }
      );

      if (resposta.ok) {
        setLivros(livros.filter((l) => l.id !== id));
      } else {
        const dados = await resposta.json();
        setErro(dados.erro || "Erro ao excluir livro.");
      }
    } catch (e) {
      setErro("Falha ao conectar ao servidor.");
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
          <TituloForm>Excluir Livros</TituloForm>
          <BotaoVoltar onClick={() => navigate("/inicio")}>Voltar</BotaoVoltar>
          {erro && <p style={{ color: "red", textAlign: "center" }}>{erro}</p>}

          <Lista>
            {livros.map((livro) => (
              <Item key={livro.id}>
                <Nome>{livro.nome}</Nome>
                <BotaoExcluir
                  onClick={() => deletarLivro(livro.id)}
                  disabled={loading}
                >
                  Excluir
                </BotaoExcluir>
              </Item>
            ))}
          </Lista>
        </Card>
      </Container>
    </>
  );
}