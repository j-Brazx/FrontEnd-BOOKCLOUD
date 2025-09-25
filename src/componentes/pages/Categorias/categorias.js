import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  background: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ColunaCategoria = styled.div`
  display: flex;
`;

const BtnAdicionar = styled.button`
  width: 200px;
  height: 40px;
  background: #27387f;
  color: white;
  font-size: 22px;
  border: none;
  padding: 10px;
  margin: 10px;
`;

const NomeCat = styled.div`
  width: 200px;
  background: #27387f;
  color: white;
  font-size: 22px;
  border: none;
  padding: 10px;
  margin: 10px;
  display: flex;           
  flex-direction: column;  
  gap: 10px;               
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

export default function Categorias() {
  const [ModalOpen, setModal] = useState(false);
  const [nome_categoria, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const resposta = await fetch(
          "http://localhost:3000/categorias/selecionar"
        );
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
      const resposta = await fetch(
        "http://localhost:3000/categorias/adicionar",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nome_categoria, descricao }),
        }
      );

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

  return (
    <Container>
      <ColunaCategoria>
        <BtnAdicionar onClick={() => setModal(true)}>Adicionar</BtnAdicionar>
         <NomeCat>
    {categorias.map((cat) => (
      <div key={cat.id}>{cat.nome_categoria}</div>
    ))}
  </NomeCat>
        {ModalOpen && (
          <FundoModal onClick={() => setModal(false)}>
            <Modal onClick={(e) => e.stopPropagation()} onSubmit={execSubmit}>
              <H1>Nova Categoria</H1>
              <Label className="form-label" htmlFor="nome">
                Nome
              </Label>
              <Input
                type="text"
                className="form-control"
                id="nome_categoria"
                name="nome_categoria"
                value={nome_categoria}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Insira o nome da Categoria"
                required
              />
              <Label className="form-label" htmlFor="descricao">
                Descrição
              </Label>
              <Input
                style={{ height: "60px" }}
                type="text"
                className="form-control"
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
    </Container>
  );
}
