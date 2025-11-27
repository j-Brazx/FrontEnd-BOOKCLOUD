import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  font-family: "Arial", sans-serif;
  background: #f4f4f4;
  min-height: 100vh;
  padding-top: 40px;
`;

const DashboardBox = styled.div`
  background: white;
  border: 2px solid #d0d0ff;
  border-radius: 10px;
  margin: 0 auto;
  padding: 20px 40px;
  width: 90%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const DateBox = styled.div`
  align-self: flex-end;
  background: #2c4aa8;
  color: white;
  padding: 5px 15px;
  border-radius: 15px;
  font-weight: bold;
  font-size: 0.9rem;
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
  gap: 20px;
  margin-top: 20px;
  flex: 1;
`;

const StatCard = styled.div`
  background: ${(props) => props.bg || "#ccc"};
  color: white;
  text-align: center;
  padding: 20px 30px;
  border-radius: 10px;
  min-width: 180px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    margin: 0;
  }

  h2 {
    margin: 5px 0 0 0;
  }
`;

const GenreBox = styled.div`
  background: #1f3b8c;
  color: white;
  text-align: center;
  margin: 25px auto 10px auto;
  padding: 15px 40px;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  max-width: 400px;
`;

export default function Painel() {
  const [emprestados, setEmprestados] = useState(0);
  const [disponiveis, setDisponiveis] = useState(0);
  const [usuarios, setUsuarios] = useState(0);
  const [generoMaiorAcervo, setGeneroMaiorAcervo] = useState("Carregando...");
  const [totalLivros, setTotalLivros] = useState(0);

  useEffect(() => {
    const api = "http://localhost:3000"; // ajuste conforme sua porta

    fetch(`${api}/livros/emprestados`)
      .then((res) => res.json())
      .then((data) => setEmprestados(data.length))
      .catch(() => setEmprestados(0));

    fetch(`${api}/livros/disponiveis`)
      .then((res) => res.json())
      .then((data) => setDisponiveis(data.length))
      .catch(() => setDisponiveis(0));

    fetch(`${api}/usuarios/selecionarTodos`)
      .then((res) => res.json())
      .then((data) => setUsuarios(data.length))
      .catch(() => setUsuarios(0));

    fetch(`${api}/categorias/maiorAcervo`)
      .then((res) => res.json())
      .then((data) =>
        setGeneroMaiorAcervo(data?.nome_categoria || "Nenhum gênero encontrado")
      )
      .catch(() => setGeneroMaiorAcervo("Erro ao carregar"));

  }, []);

  useEffect(() => {
    setTotalLivros(disponiveis + emprestados);
  }, [disponiveis, emprestados]);

  const dataAtual = new Date().toLocaleDateString("pt-BR");

  return (
    <Container>
      <DashboardBox>
        <DateBox>{dataAtual}</DateBox>

        <StatsRow>
          <StatCard bg="#2b6ea6">
            <p>Livros no acervo</p>
            <h2>{totalLivros}</h2>
          </StatCard>

          <StatCard bg="#4a238b">
            <p>Livros emprestados</p>
            <h2>{emprestados}</h2>
          </StatCard>

          <StatCard bg="#1b7b83">
            <p>Livros disponíveis</p>
            <h2>{disponiveis}</h2>
          </StatCard>

          <StatCard bg="#671d88">
            <p>Total de usuários</p>
            <h2>{usuarios}</h2>
          </StatCard>
        </StatsRow>

        <GenreBox>
          Gênero com maior acervo
          <br />
          <span style={{ fontSize: "1.8rem" }}>{generoMaiorAcervo}</span>
        </GenreBox>
      </DashboardBox>
    </Container>
  );
}