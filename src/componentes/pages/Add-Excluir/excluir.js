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
  width: 800px;
  max-width: 95%;
  flex-direction: column;
`;

const Section = styled.section`
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const TituloForm = styled.h2`
  font-size: 28px;
  margin-bottom: 10px;
  font-weight: 800;
  text-align: center;
`;

const LivroCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f0f0f0;
  border-left: 5px solid #27387f;
  border-radius: 5px;
  padding: 15px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  color: #333;
`;

const NomeLivro = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
`;

const AutorLivro = styled.span`
  font-size: 14px;
  color: #555;
`;

const BotaoExcluir = styled.button`
  background: #c62828;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;

  &:hover {
    background: #8e1b1b;
  }
`;

export default function ExcluirLivros() {
  const [livros, setLivros] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const buscarLivros = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/livros/selecionar");
        if (!resposta.ok) throw new Error("Falha ao buscar livros");
        const dados = await resposta.json();
        setLivros(dados);
      } catch (erro) {
        console.error("Erro ao buscar livros:", erro);
        setErro("Erro ao buscar livros: " + erro.message);
      }
    };
    buscarLivros();
  }, []);

  const excluirLivro = async (id, nome) => {
    const confirmar = window.confirm(`Tem certeza que deseja excluir o livro "${nome}"?`);
    if (!confirmar) return;

    setLoading(true);
    try {
      const resposta = await fetch(`http://localhost:3000/livros/excluir/${id}`, {
        method: "DELETE",
      });

      if (!resposta.ok) {
        throw new Error("Erro ao excluir o livro.");
      }

      alert(`Livro "${nome}" excluído com sucesso.`);
      setLivros(livros.filter((livro) => livro.id !== id));
    } catch (erro) {
      console.error("Erro ao excluir livro:", erro);
      setErro("Erro ao excluir livro: " + erro.message);
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
          <Section>
            <TituloForm>Excluir Livros</TituloForm>
            {erro && <p style={{ color: "red" }}>{erro}</p>}
            {loading && <p>Carregando...</p>}
            {livros.length === 0 ? (
              <p>Nenhum livro cadastrado.</p>
            ) : (
              livros.map((livro) => (
                <LivroCard key={livro.id}>
                  <Info>
                    <NomeLivro>{livro.nome}</NomeLivro>
                    <AutorLivro>{livro.autor}</AutorLivro>
                  </Info>
                  <BotaoExcluir onClick={() => excluirLivro(livro.id, livro.nome)}>
                    Excluir
                  </BotaoExcluir>
                </LivroCard>
              ))
            )}
          </Section>
        </Card>
      </Container>
    </>
  );
}