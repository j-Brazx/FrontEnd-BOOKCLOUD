import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const FundoModal = styled.div`
  background: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: -1px;
  display: flex;
  justify-content: center;
  align-items: center;
   z-index: 9998;
`;
const Modal = styled.form`
  background: #ffffffff;
  width: 300px;
  height: 300px;
  position: fixed;
  border-radius: 15px;
  text-align: center;
  font-weight: 800;
  font-size: 20px;
    z-index: 9999;
`;


export default function Sinopse() {
  const { id } = useParams();
  const [livro, setLivro] = useState(null);
  const [ModalOpen, setModal] = useState(false);
  const navigate = useNavigate();
  
const reservarLivro = async () => {
  try {
    const usuarioId = 1; // substitua depois pelo ID real do usuário logado
    const hoje = new Date();
    const dataDevolucao = new Date();
    dataDevolucao.setDate(hoje.getDate() + 15); // adiciona 15 dias

    const res = await axios.post("http://localhost:3000/emprestimos/solicitar", {
      id_livro: id,
      id_usuario: usuarioId,
      data_devolucao: dataDevolucao.toISOString().split("T")[0] // envia no formato YYYY-MM-DD
    });

    // Atualiza estado local pra refletir o novo status
    setLivro((prev) => ({
      ...prev,
      data_devolucao: dataDevolucao
    }));

    alert("Livro reservado com sucesso!");
  } catch (err) {
    console.error("Erro ao reservar livro:", err.response?.data || err.message);
    alert(
      "Não foi possível reservar o livro: " + (err.response?.data?.erro || err.message)
    );
  }
};

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

  if (!livro) {
    return (
     <p
  style={{
    fontWeight: "bold",
    color: livro?.data_devolucao ? "red" : "green",
  }}
>
  {livro?.data_devolucao
    ? `📕 Livro indisponível — disponível em: ${new Date(
        livro.data_devolucao
      ).toLocaleDateString("pt-BR")}`
    : "📗 Livro disponível"}
</p>

    );
  }

  const Editar = () => {
    navigate(`/editar/${id}`);
  };


  const Comunidade = () => {
    navigate(`/comunidade/${id}`);
  };

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

              
              <SinopseEdit>
           <Botao onClick={reservarLivro}>Reservar</Botao>
            <BotaoEditar onClick={Editar}>Editar</BotaoEditar>
              </SinopseEdit>
              <p style={{ fontWeight: "bold", color: livro.data_devolucao ? "red" : "green" }}>
  {livro.data_devolucao
    ? `Devolução prevista: ${new Date(livro.data_devolucao).toLocaleDateString("pt-BR")}`
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

const SinopseEdit = styled.div`
    display: flex;
    gap: 10px; 
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
`

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
  align-items: center;
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
  justify-self: center;
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

const Disponivel = styled.p`
  color: red;
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 1rem;
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