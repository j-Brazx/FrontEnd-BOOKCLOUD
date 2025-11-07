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
            <Th>ID do Cliente</Th>
            <Th>Nome do Usuário</Th>
            <Th>Nome do Livro</Th>
            <Th>Reserva Atual (Data de Devolução)</Th>
          </tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>João Silva</Td>
            <Td>O Hobbit</Td>
            <Td>2025-11-15</Td>
          </Tr>
          <Tr>
            <Td>2</Td>
            <Td>Maria Lima</Td>
            <Td>1984</Td>
            <Td>2025-11-20</Td>
          </Tr>
        </Tbody>
      </Table>
    </div>
  );
}
