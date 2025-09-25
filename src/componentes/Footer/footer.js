import React from "react";
import styled from "styled-components";

const Rodape = styled.footer`
  background: linear-gradient(to right, #27387f, #3653c6);
  padding: 50px 100px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 40px;
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100vw;
  max-width: 1200px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
`;

const Coluna = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 150px;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const Titulo = styled.p`
  font-style: normal;
  font-weight: 750;
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Link = styled.a`
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-size: 16px;

  &:hover {
    color: white;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Divider = styled.hr`
  width: 100%;
  border: 0.5px solid rgba(255, 255, 255, 0.3);
  margin: 20px 0;
`;

const Nome = styled.p`
  font-size: 24px;
  font-style: normal;
  font-weight: 750;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const EmailBox = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 15px;
  text-align: center;
  border-radius: 5px;
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export default function Baixo() {
  return (
    <Rodape>
      <Container>
        <Coluna>
          <Titulo>...</Titulo>
          <Link href="#">...</Link>
          <Link href="#">...</Link>
        </Coluna>
        <Coluna>
          <Titulo>SERVIÇOS</Titulo>
          <Link href="#">BookCloud Serviços</Link>
          <Link href="#">Empréstimo</Link>
        </Coluna>
        <Coluna>
          <Titulo>BOOKCLOUD</Titulo>
          <Link href="/inicio">Início</Link>
          <Link href="/acervo">Acervo</Link>
          <Link href="/categorias">Categorias</Link>
        </Coluna>
      </Container>

      <Divider />

      <Nome>BOOKCLOUD</Nome>

      <EmailBox>
        UM MUNDO DE LIVROS PARA VOCÊ: <strong>bookcloud@acervo.com.br</strong>
      </EmailBox>

      <p>
        Copyright 2025 BOOKCLOUD™. Todos os direitos reservados.
      </p>
    </Rodape>
  );
}
