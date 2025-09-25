import React from "react";
import styled from "styled-components";

export default function ProfileCard() {
  return (
    <>
      <Card>
        <Avatar>👤</Avatar>
        <UserInfo>
          <strong>Nome: xxxxxx</strong>
          <p>nomeexemplo@gmail.com</p>
        </UserInfo>
      </Card>

      <Card2>
        <Lidos>Livros Lidos</Lidos>
      </Card2>
      <Linha></Linha>

      


    </>
  );
}

const Linha = styled.hr`
  width: 90%;
  background: #c2c2c2ff;
  height: 2px;
  margin-bottom: 10px;
`;

const Lidos = styled.h2`
  font-weight: bold;
  font-size: 20px;
  margin-left: 30px;
`;

const Card2 = styled.div`
  margin-left: 5vw;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  border-radius: 10px;
  padding: 30px;
  width: 300px;
  margin-bottom: 40px;
  justify-self: center;
  margin-top: 40px;

  @media (max-width: 500px) {
    width: 90%;
  }
`;

const Avatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #2c5bd9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  color: white;
  margin-bottom: 15px;
`;

const UserInfo = styled.div`
  text-align: center;
  r strong {
    display: block;
  }
`;
