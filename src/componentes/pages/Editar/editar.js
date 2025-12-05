import React, { useState, useEffect } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Fundo from "../../img/FundoLivros.webp";
import { useNavigate, useParams } from "react-router-dom";

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
  flex-direction: column; /* mobile empilha */
  @media (min-width: 768px) {
    flex-direction: row; /* desktop lado a lado */
  }
`;

const FormSection = styled.form`
  padding: 40px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const TituloForm = styled.h2`
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: 800;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column; /* mobile empilha */
  gap: 20px;
  @media (min-width: 768px) {
    flex-direction: row; /* desktop lado a lado */
  }
`;

const UploadBox = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  border-radius: 10%;
  border-bottom: 3px solid #27387f;
  overflow: hidden;
  background: #f0f0f0;
  @media (min-width: 768px) {
    width: 200px;
    height: 250px;
  }
`;

const InputFile = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
`;

const PreviewImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
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
  width: 100%;
  max-width: 450px;
`;

const TextArea = styled.textarea`
  margin-bottom: 15px;
  padding: 12px;
  border: none;
  border-radius: 2px;
  background: #f0f0f0;
  font-size: 15px;
  border-bottom: 3px solid #27387f;
  outline: none;
  width: 100%;
  max-width: 450px;
  resize: none;
  height: 100px;
`;

const Botao = styled.button`
  padding: 14px;
  background: #27387f;
  color: white;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: background 0.3s;
  border: none;
  border-radius: 5px;
  &:hover {
    background: #1d2b5c;
  }
`;

const BotaoCancelar = styled.button`
  padding: 14px;
  background: #b3b3b3;
  color: black;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  margin-left: 0;
  transition: background 0.3s;
  border: none;
  border-radius: 5px;
  &:hover {
    background: #8e8e8e;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
  @media (min-width: 480px) {
    flex-direction: row;
  }
`;

export default function EditarLivro() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [autor, setAutor] = useState("");
  const [avaliacao, setAvaliacao] = useState("");
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);

  // Carregar dados do livro
  useEffect(() => {
    async function carregarDados() {
      try {
        const resposta = await fetch(
          `http://localhost:3000/livros/livrosPorId/${id}`
        );
        const dados = await resposta.json();

        if (!resposta.ok) {
          alert("Erro ao carregar dados do livro");
          return;
        }

        setNome(dados.nome || "");
        setSinopse(dados.sinopse || "");
        setAutor(dados.autor || "");
        setAvaliacao(dados.avaliacao || "");

        if (dados.imagem) {
          setPreview(`data:image/jpeg;base64,${dados.imagem}`);
        }
      } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
      }
    }

    carregarDados();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("nome", nome);
      formData.append("sinopse", sinopse);
      formData.append("autor", autor);
      formData.append("avaliacao", avaliacao);

      if (imagem) {
        formData.append("imagem", imagem);
      }

      const resposta = await fetch(
        `http://localhost:3000/livros/atualizarlivros/${id}`,
        { method: "PUT", body: formData }
      );

      const dados = await resposta.json();

      if (resposta.ok) {
        alert("Livro atualizado com sucesso!");
        navigate("/acervo");
      } else {
        alert(dados.erro || "Erro ao atualizar o livro.");
      }
    } catch (erro) {
      console.error("Erro ao conectar:", erro);
      alert("Falha ao conectar ao servidor.");
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
          <FormSection onSubmit={handleSubmit}>
            <TituloForm>Editar Livro</TituloForm>

            <Section>
              <UploadBox>
                {preview && <PreviewImg src={preview} alt="Pré-visualização" />}
                <InputFile
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImagem(file);
                    if (file) setPreview(URL.createObjectURL(file));
                  }}
                />
              </UploadBox>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <Input
                  type="text"
                  placeholder="Nome do livro"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />

                <TextArea
                  placeholder="Sinopse"
                  value={sinopse}
                  onChange={(e) => setSinopse(e.target.value)}
                />

                <Input
                  type="text"
                  placeholder="Autor"
                  value={autor}
                  onChange={(e) => setAutor(e.target.value)}
                />
              </div>
            </Section>

            <ButtonGroup>
              <Botao type="submit">Salvar Alterações</Botao>
              <BotaoCancelar onClick={() => navigate("/acervo")}>
                Cancelar
              </BotaoCancelar>
            </ButtonGroup>
          </FormSection>
        </Card>
      </Container>
    </>
  );
}
