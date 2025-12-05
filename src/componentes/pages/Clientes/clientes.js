import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function App() {
  const [dados, setDados] = useState([]);

  const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
  `;

  const Thead = styled.thead`
    background-color: #1e3a8a;
    color: white;
  `;

  const Th = styled.th`
    padding: 10px;
    border: 1px solid #ccc;
    text-align: left;
  `;

  const Tbody = styled.tbody``;

  const Tr = styled.tr`
    &:nth-child(even) {
      background-color: #f2f2f2;
    }
  `;

  const Td = styled.td`
    padding: 10px;
    border: 1px solid #ccc;
  `;

  useEffect(() => {
    const buscarDados = async () => {
      try {
        const resposta = await fetch(
          "http://localhost:3000/emprestimos/ativo"
        );
        const dadosApi = await resposta.json();
        console.log("Resposta API:", dadosApi);
        setDados(Array.isArray(dadosApi) ? dadosApi : []);
      } catch (erro) {
        console.error("Erro ao carregar dados:", erro);
      }
    };

    buscarDados();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Lista de Empréstimos</h2>

      <Table>
        <Thead>
          <tr>
            <Th>ID Usuário</Th>
            <Th>Nome Usuário</Th>
            <Th>Livro</Th>
            <Th>Data Devolução</Th>
          </tr>
        </Thead>

        <Tbody>
          {dados.length === 0 ? (
            <Tr>
              <Td colSpan={4} style={{ textAlign: "center" }}>
                Nenhum empréstimo encontrado.
              </Td>
            </Tr>
          ) : (
            dados.map((item, index) => (
              <Tr key={index}>
                <Td>{item.id_usuario}</Td>
                <Td>{item.nome_usuario}</Td>
                <Td>{item.nome_livro}</Td>
                <Td>
                  {item.data_devolucao
                    ? new Date(item.data_devolucao).toLocaleDateString("pt-BR")
                    : "—"}
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </div>
  );
}
