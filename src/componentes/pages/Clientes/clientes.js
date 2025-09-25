import React from "react";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  background-color: #1e3a8a; /* Azul */
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
    background-color: #f2f2f2; /* Cor para linhas alternadas */
  }
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ccc;
`;

export default function Tabela() {
  return (
    <div style={{ padding: "20px" }}>
      <Table>
        <Thead>
          <tr>
            <Th>ID</Th>
            <Th>Status</Th>
            <Th>Livro</Th>
            <Th>Reservas</Th>
            <Th>Multas</Th>
            <Th>Nome</Th>
          </tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>001</Td>
            <Td>Ativo</Td>
            <Td>Nenhuma</Td>
            <Td>2 livros</Td>
            <Td>R$ 0,00</Td>
            <Td>Josevaldo</Td>
          </Tr>
          <Tr>
            <Td>002</Td>
            <Td>Suspenso</Td>
            <Td>Nenhuma</Td>
            <Td>Nenhuma</Td>
            <Td>R$ 18,00</Td>
            <Td>Roberto</Td>
          </Tr>
        </Tbody>
      </Table>
    </div>
  );
}

