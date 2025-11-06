import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Fundo from "../../img/FundoLivros.webp";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";


const selecionarCategorias = async () => {
  try {
    const resposta = await fetch(
      `http://localhost:3000/categorias/selecionarLivro`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carregar),
      }
    );
    if (!resposta.ok) {
      const errorData = await resposta.json().catch(() => ({
        message: "Erro ao mostrar categorias.",
      }));
      throw new Error(
        errorData.message || "Erro desconhecido ao atualizar movimentação."
      );
    }
    return await resposta.json();
  } catch (erro) {
    console.error("Erro ao carregar categorias:", erro);
    throw erro;
    
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

const Select = styled.select`
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
 84f9b33c58db6c543ae0c218c2ad571f58af0c58
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

const Option = styled.option`
  color: black;
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

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [autor, setAutor] = useState("");
  const [imagem, setImagem] = useState(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoria, setCategoria] = useState([]);
  const [id_categoria, setId_categoria] = useState("");
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const resposta = await fetch(
          "http://localhost:3000/categorias/selecionar"
        );
        if (!resposta.ok) throw new Error("Falha ao buscar categorias");
        const dados = await resposta.json();
        setCategoria(dados);
      } catch (erro) {
        console.error("Erro ao buscar categorias:", erro);
        setErro("Erro ao buscar categorias: " + erro.message);
      }
    };
    fetchCategorias();
  }, []);

  const execSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErro("");

    try {
      const formData = new FormData();
      formData.append("nome", nome);
      formData.append("sinopse", sinopse);
      formData.append("autor", autor);
      if (imagem) {
        formData.append("imagem", imagem);
      }
      formData.append("id_categoria", id_categoria);

      const resposta = await fetch(
        "http://localhost:3000/livros/cadastrarLivros",
        {
          method: "POST",
          body: formData,
        }
      );

      const dados = await resposta.json();

      if (resposta.ok) {
        alert("Cadastro de livro realizado com sucesso");
        navigate("/inicio");
      } else {
        setErro(dados.message || "Erro ao cadastrar livro. Tente novamente");
      }
    } catch (e) {
      console.log("Falha ao conectar a API", e);
      setErro("Não foi possível conectar ao servidor");
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
          <FormSection onSubmit={execSubmit}>
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
    required
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
                <Select
                  className="form-select"
                  id="id_categoria"
                  value={id_categoria}
                  onChange={(e) => setId_categoria(e.target.value)}
                  required
                >
                     <Option value="" disabled>
                Selecione um Gênero
                </Option>
                  {categoria.map((categorias) => (
                    <Option value={categorias.id} key={categorias.id}>
                      {categorias.nome_categoria}
                    </Option>
                  ))}
                </Select>
              </div>
            </Section>
            <Botao type="submit">Cadastrar</Botao>
          </FormSection>
        </Card>
      </Container>
    </>
  );
}
