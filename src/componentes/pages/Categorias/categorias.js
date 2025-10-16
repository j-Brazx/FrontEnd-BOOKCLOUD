import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const ColunaCategoria = styled.div`
  display: flex;
  flex-direction: column;
`;

const BtnAdicionar = styled.button`
  width: 200px;         
  gap: 10px; 
  background: #27387f;
  color: white;
  font-size: 22px;
  border: none;
  padding: 10px;
  margin: 10px;
  cursor: pointer;

  &:hover {
    background: #1d2b5c;
  }
`;

const NomeCat = styled.div`
  display: flex;           
  flex-direction: column;          
`;

const Cat = styled.button`
  width: 200px;
  background: #27387f;
  color: white;
  font-size: 22px;
  border: none;
  padding: 10px;               
  margin-bottom: 10px;   
  margin-left: 10px;    
  cursor: pointer;
  
  &:hover {
    background: #1d2b5c;
  }
`;

const FundoModal = styled.div`
  background: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: -1px;
  display: flex;
  justify-content: center;
  align-items: center;
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
`;

const Botao = styled.button`
  width: 120px;
  height: 40px;
  background: #27387f;
  color: white;
  font-size: 22px;
  border: none;
  padding: 10px;
  margin: 10px;
  cursor: pointer;

  &:hover {
    background: #1d2b5c;
  }
`;

const Input = styled.input`
  width: 90%;
  background: #d9d9d9;
  border: none;
  height: 25px;
  border-radius: 5px;
`;

const H1 = styled.h1`
  font-weight: 800;
  font-size: 20px;
`;
const Label = styled.h1`
  font-weight: 800;
  font-size: 20px;
  text-align: left;
  margin-left: 5px;
`;

// estilo dos cards de livros
const ListaLivros = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const CardLivro = styled.div`
  width: 180px;
  background: #f5f5f5;
  border-radius: 10px;
  padding: 10px;
  position: relative;
  text-align: center;
`;

const ImgLivro = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
`;

const StatusCircle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => (props.livre ? "#34ba3a" : "#ce1f22")};
  position: absolute;
  bottom: 15px;
  right: 15px;
  border: 2px solid white;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.3);
  }
`;

export default function Categorias() {
  const [ModalOpen, setModal] = useState(false);
  const [nome_categoria, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [livros, setLivros] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const resposta = await fetch("http://localhost:3000/categorias/selecionar");
        const dados = await resposta.json();
        if (resposta.ok) {
          setCategorias(dados);
        } else {
          console.error("Erro ao buscar categorias:", dados.message);
        }
      } catch (erro) {
        console.error("Erro ao conectar à API:", erro);
      }
    };
    fetchCategorias();
  }, []);

  const execSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErro("");

    try {
      const resposta = await fetch("http://localhost:3000/categorias/adicionar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome_categoria, descricao }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        alert("Cadastro realizado com sucesso");
        setCategorias((prev) => [...prev, dados]);
        setModal(false);
        setNome("");
        setDescricao("");
      } else {
        setErro(dados.message || "Erro ao fazer cadastro");
      }
    } catch (erro) {
      console.error("Falha ao conectar à API:", erro);
      setErro("Erro ao conectar à API: " + erro.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchLivros = async (categoriaId) => {
  try {
    const resposta = await fetch(
      `http://localhost:3000/livros/livrosporcat/${categoriaId}`
    );
    const dados = await resposta.json();

    if (resposta.ok) {
    
      const livrosComImagem = dados.map((livro) => {
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
      setCategoriaSelecionada(categoriaId);
    }
  } catch (erro) {
    console.error("Erro ao buscar livros:", erro);
  }
};


  return (
    <Container>
      <ColunaCategoria>
        <BtnAdicionar onClick={() => setModal(true)}>Adicionar</BtnAdicionar>
        <NomeCat>
          {categorias.map((cat) => (
            <Cat  key={cat.id} onClick={() => fetchLivros(cat.id)} >
              {cat.nome_categoria}
            </Cat>
          ))}
        </NomeCat>
        {ModalOpen && (
          <FundoModal onClick={() => setModal(false)}>
            <Modal onClick={(e) => e.stopPropagation()} onSubmit={execSubmit}>
              <H1>Nova Categoria</H1>
              <Label htmlFor="nome">Nome</Label>
              <Input
                type="text"
                id="nome_categoria"
                name="nome_categoria"
                value={nome_categoria}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Insira o nome da Categoria"
                required
              />
              <Label htmlFor="descricao">Descrição</Label>
              <Input
                style={{ height: "60px" }}
                type="text"
                id="descricao"
                name="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Insira a descrição da categoria"
                required
              />
              <Botao type="submit">Adicionar</Botao>
            </Modal>
          </FundoModal>
        )}
      </ColunaCategoria>

  
      {categoriaSelecionada && (
        <div style={{ marginTop: "20px" }}>
          <h2>
            Livros da categoria:{" "}
            {categorias.find((c) => c.id === categoriaSelecionada)?.nome_categoria}
          </h2>

          <ListaLivros>
            {livros.length > 0 ? (
              livros.map((livro) => (
                <CardLivro key={livro.id}>
                  {livro.imagem && (
                    <ImgLivro
                      src={`data:image/jpeg;base64,${livro.imagem}`} 
                    />
                  )}
                  <StatusCircle livre={livro.status === "livre"} />
                  <p>{livro.nome}</p>
                </CardLivro>
              ))
            ) : (
              <p>Nenhum livro encontrado nesta categoria.</p>
            )}
          </ListaLivros>
        </div>
      )}
    </Container>
  );
}
