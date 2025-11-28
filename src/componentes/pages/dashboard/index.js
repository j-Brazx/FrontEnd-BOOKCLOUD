
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

/* LISTA DE EMPRESTADOS */
const ListaEmprestados = styled.div`
  margin-top: 30px;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  border: 2px solid #d0d0ff;
`;

const LivroCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #eef1ff;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 10px;
  border-left: 5px solid #27387f;
`;

const NomeLivro = styled.span`
  font-weight: bold;
  font-size: 1rem;
  color: #27387f;
`;

const BtnDevolver = styled.button`
  background: #27387f;
  color: white;
  padding: 6px 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #1d2e63;
  }
`;

export default function Painel() {
  const [emprestados, setEmprestados] = useState([]);
  const [disponiveis, setDisponiveis] = useState(0);
  const [usuarios, setUsuarios] = useState(0);
  const [generoMaiorAcervo, setGeneroMaiorAcervo] = useState("Carregando...");
  const [totalLivros, setTotalLivros] = useState(0);

  const api = "http://localhost:3000";

  /* =======================
       CARREGAR EMPRESTADOS
  ======================= */
  const carregarEmprestimos = async () => {
    try {
      const res = await fetch(`${api}/livros/emprestados`);
      const data = await res.json();
      setEmprestados(data);
    } catch (e) {
      console.error("Erro ao carregar empréstimos:", e);
    }
  };

  /* =======================
       BUSCAR DADOS INICIAIS
  ======================= */
  useEffect(() => {
    carregarEmprestimos();

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
    setTotalLivros(disponiveis + emprestados.length);
  }, [disponiveis, emprestados]);

  /* ======================
       DEVOLVER LIVRO
  ====================== */
  const devolverLivro = async (id_emprestimo) => {
    console.log("Tentando devolver empréstimo ID:", id_emprestimo); // DEBUG

    if (!id_emprestimo) {
      alert("ID do empréstimo inválido!");
      return;
    }

    try {
      const resposta = await fetch(
        `http://localhost:3000/emprestimos/devolver/${id_emprestimo}`,
        {
          method: "POST",
        }
      );

      const dados = await resposta.json();

      if (resposta.ok) {
        alert("Livro devolvido com sucesso!");
        carregarEmprestimos(); // atualiza lista
      } else {
        alert(dados.message || "Erro ao devolver livro");
      }
    } catch (erro) {
      console.error("Erro ao devolver livro:", erro);
      alert("Erro ao conectar ao servidor");
    }
  };

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
            <h2>{emprestados.length}</h2>
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

        {/* LISTA DE LIVROS EMPRESTADOS */}
        <ListaEmprestados>
          <h2 style={{ color: "#27387f" }}>Livros Emprestados</h2>

          {emprestados.length === 0 ? (
            <p>Nenhum livro emprestado.</p>
          ) : (
            emprestados.map((livro) => (
              <LivroCard key={livro.id}>
                <NomeLivro>{livro.nome}</NomeLivro>
                {/* Enviando ID do empréstimo, não do livro */}
                <BtnDevolver onClick={() => devolverLivro(livro.id)}>
                  Devolver
                </BtnDevolver>
              </LivroCard>
            ))
          )}
        </ListaEmprestados>
      </DashboardBox>
    </Container>
  );
}
