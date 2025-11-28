import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Fundo from "../../img/FundoLivros.webp";
import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

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

const Input = styled.input`
  margin-bottom: 15px;
  padding: 12px;
  border: none;
  border-radius: 2px;
  background: #f0f0f0;
  font-size: 15px;
  border-bottom: 3px solid #27387f;
  outline: none;
  width: 450px;
  margin-left: 15px;
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
  width: 450px;
  margin-left: 15px;
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

  &:hover {
    background: #1d2b5c;
  }
`;

const InputFile = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0; /* invisível mas clicável */
  cursor: pointer;
  z-index: 2; /* fica por cima para continuar clicável */
`;
const Section = styled.section`
  display: flex;
`;


const UploadBox = styled.div`
  width: 200px;
  height: 95%;
  position: relative;
  border-radius: 10%;
  border-bottom: 3px solid #27387f;
  overflow: hidden;
  background: #f0f0f0;
`;

const PreviewImg = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
  z-index: 1;
`;

/* --- styled components omitidos por espaço, iguais aos seus... --- */

export default function EditarLivro() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [autor, setAutor] = useState("");
  const [avaliacao, setAvaliacao] = useState("");
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);

  // --------------------------------------------------
  // CARREGAR DADOS DO LIVRO
  // --------------------------------------------------
  useEffect(() => {
    async function carregarDados() {
      try {
        const resposta = await fetch(`http://localhost:3000/livros/${id}`);
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
          const base64 = `data:image/jpeg;base64,${dados.imagem}`;
          setPreview(base64);
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

      // 🔥 CORREÇÃO: manter imagem original caso usuário não selecione uma nova
      if (imagem) {
        formData.append("imagem", imagem);
      } else {
        formData.append("manterImagem", "true");
      }

      const resposta = await fetch(
        `http://localhost:3000/livros/atualizarlivros/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const dados = await resposta.json();

      if (resposta.ok) {
        alert("Livro atualizado com sucesso!");
        navigate("/acervo");
      } else {
        alert(dados.erro || "Erro ao atualizar o livro.");
      }
    } catch (erro) {
      console.error("Erro ao conectar à API:", erro);
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
            <TituloForm>Cadastro de Livros</TituloForm>
            <Section>
              <UploadBox>
  {preview && <PreviewImg src={preview} alt="Pré-visualização" />}
  <InputFile
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0];
      setImagem(file);
      if (file) {
        setPreview(URL.createObjectURL(file));
      } else {
        setPreview(null);
      }
    }}
  />
</UploadBox>

              <div style={{ display: "flex", flexDirection: "column" }}>
                <Input
                  type="text"
                  className="form-control"
                  id="nome"
                  name="nome"
                  placeholder="Insira o nome do livro"
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value);
                  }}
                  required
                />
                <TextArea
                  placeholder="Insira a sinopse do livro"
                  type="text"
                  id="sinopse"
                  name="sinopse"
                  value={sinopse}
                  onChange={(e) => setSinopse(e.target.value)}
                  required
                />
                <Input
                  type="text"
                  className="form-control"
                  id="autor"
                  name="autor"
                  placeholder="Insira so nome do Autor"
                  value={autor}
                  onChange={(e) => {
                    setAutor(e.target.value);
                  }}
                  required
                />
              </div>
            </Section>
            <Botao type="submit">Cadastrar</Botao>
          </FormSection>
        </Card>
      </Container>
    </>
  );
}
