import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export default function Sinopse() {
  const { id } = useParams();
  const [livro, setLivro] = useState(null);
  const navigate = useNavigate();

  // ===============================
  // 📌 FUNÇÃO DE EMPRESTAR LIVRO
  // ===============================
  const solicitarEmprestimo = async () => {
    try {
      const usuarioId = 1; 
      const hoje = new Date();
      const dataDevolucao = new Date();
      dataDevolucao.setDate(hoje.getDate() + 15);

      await axios.post("http://localhost:3000/emprestimos/solicitar", {
        id_livro: id,
        id_usuario: usuarioId,
        data_devolucao: dataDevolucao.toISOString().split("T")[0],
      });

      setLivro((prev) => ({ ...prev, data_devolucao: dataDevolucao }));
      alert("Livro reservado com sucesso!");
    } catch (err) {
      alert("Não foi possível reservar o livro.");
      console.error(err);
    }
  };

  // ===============================
  // 📌 BUSCAR O LIVRO
  // ===============================
  useEffect(() => {
    axios
      .get(`http://localhost:3000/livros/livroSinopse/${id}`)
      .then((res) => {
        const dados = Array.isArray(res.data) ? res.data[0] : res.data;
        if (!dados) return;

        let imagemBase64 = null;

        if (dados.imagem?.data) {
          const bytes = new Uint8Array(dados.imagem.data);
          let binary = "";
          bytes.forEach((b) => (binary += String.fromCharCode(b)));
          imagemBase64 = `data:image/jpeg;base64,${btoa(binary)}`;
        }

        setLivro({ ...dados, imagem: imagemBase64 });
      })
      .catch((err) => console.error("Erro ao buscar livro:", err));
  }, [id]);

  if (!livro) return <p>Carregando...</p>;

  const Editar = () => navigate(`/editar/${id}`);
  const Comunidade = () => navigate(`/comunidade/${id}`);

  return (
    <Container>
      <Main>
        <Card>
          <Breadcrumb>
            Acervo &gt; {livro.nome_categoria} &gt;{" "}
            <span className="font-semibold">{livro.nome}</span>
          </Breadcrumb>

          <Grid>
            <ImageContainer>
              <Img src={livro.imagem} alt={livro.nome} />
            </ImageContainer>

            <TextContainer>
              <Titulo>SINOPSE</Titulo>
              <Descricao>"{livro.sinopse}"</Descricao>

              {/* =============================== */}
              {/* ⭐ BOTÕES */}
              {/* =============================== */}
              <SinopseEdit>
                <Botao onClick={solicitarEmprestimo}>Reservar</Botao>

                <BotaoEditar onClick={Editar}>Editar</BotaoEditar>
              </SinopseEdit>

              <p
                style={{
                  fontWeight: "bold",
                  color: livro.data_devolucao ? "red" : "green",
                }}
              >
                {livro.data_devolucao
                  ? `Devolução prevista: ${new Date(
                      livro.data_devolucao
                    ).toLocaleDateString("pt-BR")}`
                  : "Livro disponível"}
              </p>
            </TextContainer>
          </Grid>

          <ComuContainer>
            <ComuBotao onClick={Comunidade}>Comunidade</ComuBotao>
          </ComuContainer>
        </Card>
      </Main>
    </Container>
  );
}

/* ========================================================= */
/*                     STYLED COMPONENTS                     */
/* ========================================================= */

const Container = styled.div`
  background-color: #f3f4f6;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 2rem;
`;

const Card = styled.div`
  max-width: 1000px;
  width: 100%;
  padding: 2rem;
  background: white;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
`;

const Breadcrumb = styled.p`
  color: gray;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Img = styled.img`
  width: 70%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
  border-radius: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const TextContainer = styled.div`
  margin-bottom: 30px;
`;

const Titulo = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Descricao = styled.p`
  color: #444;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const SinopseEdit = styled.div`
  display: flex;
  gap: 10px;
`;

const Botao = styled.button`
  padding: 12px 24px;
  background: #27387f;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #1d2b5c;
  }
`;

const BotaoEditar = styled.button`
  padding: 12px 24px;
  background: #27387f;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #1d2b5c;
  }
`;

const ComuContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const ComuBotao = styled.button`
  background: #d3d3d3;
  color: #1e3a8a;
  font-weight: 600;
  padding: 10px 24px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background: #bfbfbf;
  }
`;
