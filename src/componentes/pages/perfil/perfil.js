import { useEffect, useState } from "react";
import styled from "styled-components";

const Card = styled.div`
  background: white;
  justify-self: center;
  margin-top: 40px;
  border-color: none;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
   min-width: 200px;  /* nunca menor que 200px */
  max-width: 500px;  /* nunca maior que 350px */
  padding: 50px;
  flex: 1;   
`;

const AvatarWrapper = styled.div`
  position: relative;
  width: 170px;
  height: 170px;
  justify-self: center;
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
  border: 3px solid #27387f;
`;

const DefaultAvatar = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  font-size: 36px;
  color: #27387f;
  cursor: pointer;
  border: 3px solid #27387f;
`;

const InputFile = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Nome = styled.h2`
  font-size: 35px;
  margin: 0;
`;
const Email = styled.p`
  font-size: 20px;
  `;

export default function ProfileCard() {
  const [usuario, setUsuario] = useState(null);
  const [foto, setFoto] = useState(null);

  useEffect(() => {
    const dados = localStorage.getItem("usuario");
    if (dados) {
      setUsuario(JSON.parse(dados));
    }
    const fotoSalva = localStorage.getItem("fotoUsuario");
    if (fotoSalva) {
      setFoto(fotoSalva);
    }
  }, []);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFoto(imageUrl);
      localStorage.setItem("fotoUsuario", imageUrl);
    }
  };

  return (
    <>
    <Card>
      <AvatarWrapper>
        {foto ? (
          <Avatar src={foto} alt="Foto de perfil" />
        ) : (
          <DefaultAvatar>👤</DefaultAvatar>
        )}
        <InputFile type="file" accept="image/*" onChange={handleFotoChange} />
      </AvatarWrapper>

      <UserInfo>
        <Nome>{usuario?.nome || "Usuário Desconhecido"}</Nome>
        <Email>{usuario?.email || "email@exemplo.com"}</Email>
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
  font-size: 20px;
  margin-left: 30px;
`;

const Card2 = styled.div`
  margin-left: 5vw;
`;

