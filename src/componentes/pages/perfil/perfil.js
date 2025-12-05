import { useEffect, useState } from "react";
import styled from "styled-components";

export default function ProfileCard() {
  const [usuario, setUsuario] = useState({ nome: "", email: "" });

  useEffect(() => {
    const dados = localStorage.getItem("usuario");
    if (dados) {
      try {
        const user = JSON.parse(dados);
        setUsuario({
          nome: user.nome || "",
          email: user.email || "email@exemplo.com",
        });
      } catch {
        setUsuario({ nome: "", email: "email@exemplo.com" });
      }
    } else {
      setUsuario({ nome: "", email: "email@exemplo.com" });
    }
  }, []);

  return (
    <>
      <Card>
        <AvatarWrapper>
          <DefaultAvatar>👤</DefaultAvatar>
        </AvatarWrapper>

        <UserInfo>
          <Nome>{usuario?.nome?.trim() || "Usuário Desconhecido"}</Nome>
          <Email>{usuario?.email || "email@exemplo.com"}</Email>
        </UserInfo>
      </Card>
      <Linha />
    </>
  );
}

/* =================== ESTILOS =================== */

const Card = styled.div`
  background: white;
  justify-self: center;
  margin-top: 40px;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
  min-width: 200px;
  max-width: 500px;
  padding: 50px;
  flex: 1;
`;

const AvatarWrapper = styled.div`
  position: relative;
  width: 170px;
  height: 170px;
  justify-self: center;
`;

const DefaultAvatar = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  color: #27387f;
  border: 3px solid #27387f;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Nome = styled.h2`
  font-size: 35px;
  margin: 0;
  color: #27387f;
  text-align: center;
  min-height: 45px;
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Email = styled.p`
  font-size: 20px;
`;

const Linha = styled.hr`
  width: 90%;
  background: #c2c2c2ff;
  height: 2px;
  margin-bottom: 10px;
`;

const Lidos = styled.h2`
  font-size: 20px;
  margin-left: 30px;
`;

const Card2 = styled.div`
  margin-left: 5vw;
`;
