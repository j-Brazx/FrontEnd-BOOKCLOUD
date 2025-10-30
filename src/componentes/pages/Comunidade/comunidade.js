import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  body {
    background: #27387f; 
  }
`
const Titulo = styled.div`
  justify-self: center;
  font-weight: 900;
  font-size: 50px;
  color: white
`;

const Comentario = styled.div`
    background-color: white;
    width:85%;
    margin-left: 3%;
    border-radius: 15px;
`
const CaixaTexto = styled.textarea`
  width: 80%;
  resize: none;
  margin-left: 3%;
  height: 50px;
`
const Botao= styled.button`
   background-color: #27387F;
  color: white;
  font-size: 24px;
  border: none;
  padding: 15px;
  width: 200px;
  margin: 13px;

  &:hover {
    background: #1d2b5c;
  }
`
const DivStar = styled.div`
  margin-left: 3%;
  margin-bottom: 10px;
`

function renderEstrelas(avaliacao) {
  const estrelas = [];
  const cheia = Math.floor(avaliacao); 
  const meia = avaliacao % 1 >= 0.5 ? 1 : 0; 
  const vazia = 5 - cheia - meia; 

  for (let i = 0; i < cheia; i++) {
    estrelas.push(<Star key={`c${i}`} size={20} color="#FACC15" fill="#FACC15" />);
  }

  if (meia) {
    estrelas.push(<Star key="m" size={20} color="#FBBF24" fill="#FBBF24" />);
  }

  for (let i = 0; i < vazia; i++) {
    estrelas.push(<Star key={`v${i}`} size={20} color="#D1D5DB" />);
  }

  return estrelas;
}

export default function Comunidade() {
  const { id } = useParams(); 
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState("");
  const [novaNota, setNovaNota] = useState(0);


  useEffect(() => {
    const fetchComentarios = async () => {
      try {
        const res = await fetch(`http://localhost:3000/comentario/listarPorLivro/${id}`);
        const data = await res.json();
        setComentarios(data);
      } catch (erro) {
        console.error("Erro ao buscar comentários:", erro);
      }
    };
    fetchComentarios();
  }, [id]);

 
  const enviarComentario = async () => {
    if (!novoComentario || novaNota === 0) return alert("Dê uma nota e escreva algo!");
    const novo = {
      texto: novoComentario,
      nota: novaNota,
    };

    try {
      const res = await fetch("http://localhost:3000/comentario/comentar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novo),
      });

      if (!res.ok) throw new Error("Erro ao enviar comentário");

      const comentarioCriado = await res.json();
      setComentarios([comentarioCriado, ...comentarios]);
      setNovoComentario("");
      setNovaNota(0);
    } catch (erro) {
      console.error("Erro ao enviar comentário:", erro);
    }
  };

  return (
    <>
    <GlobalStyle/>
    <div className="min-h-screen bg-[#1A237E] text-white p-6 flex flex-col items-center">
      <Titulo>Comentários</Titulo>
      
      <div className="flex flex-col gap-4 w-full max-w-xl">
        {comentarios.map((c, i) => (
          <Comentario
            key={i}
            className="flex flex-col bg-white text-black rounded-2xl p-3 shadow-md"
          >
            <p className="text-sm font-semibold">{c.usuario_nome || "Anônimo"} {renderEstrelas(c.avaliacao)}
            </p>
            
            <p className="text-sm">{c.texto}</p>
          </Comentario>
        ))}
      </div>
    </div>
      <div className="bg-white text-black rounded-2xl p-4 w-full max-w-xl mb-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-2">Deixe seu comentário</h2>

        <DivStar>
          {[1, 2, 3, 4, 5].map((n) => (
            <Star
              key={n}
              size={28}
              className={`cursor-pointer transition ${
                n <= novaNota ? "fill-yellow-400 text-yellow-400" : "text-gray-400"
              }`}
              onClick={() => setNovaNota(n)}
            />
          ))}
        </DivStar>

        <CaixaTexto
          placeholder="Escreva seu comentário..."
          className="w-full border border-gray-300 rounded-lg p-2 h-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={novoComentario}
          onChange={(e) => setNovoComentario(e.target.value)}
        />

        <Botao
          onClick={enviarComentario}
        >
          Enviar
        </Botao>
      </div></>
  );
}
