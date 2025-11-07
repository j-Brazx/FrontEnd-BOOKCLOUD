import { useEffect, useState } from "react";
import styled from "styled-components"; // 👈 IMPORTANTE

export default function ProfileCard() {
  const [usuario, setUsuario] = useState({ nome: "", email: "" });
  const [foto, setFoto] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [novoNome, setNovoNome] = useState("");

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

    const fotoSalva = localStorage.getItem("fotoUsuario");
    if (fotoSalva) setFoto(fotoSalva);
  }, []);

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFoto(imageUrl);
      localStorage.setItem("fotoUsuario", imageUrl);
    }
  };

  const handleNomeClick = () => {
    setNovoNome(usuario?.nome || "");
    setIsEditing(true);
  };

  const handleNomeSave = () => {
    const nomeAtualizado =
      novoNome.trim().slice(0, 25) || "Usuário Desconhecido"; // limite de 25 caracteres
    const novoUsuario = { ...usuario, nome: nomeAtualizado };
    setUsuario(novoUsuario);
    localStorage.setItem("usuario", JSON.stringify(novoUsuario));
    setIsEditing(false);
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
          {isEditing ? (
            <StyledInput
              type="text"
              value={novoNome}
              maxLength={25}
              onChange={(e) => setNovoNome(e.target.value)}
              onBlur={handleNomeSave}
              onKeyDown={(e) => e.key === "Enter" && handleNomeSave()}
              autoFocus
            />
          ) : (
            <Nome onClick={handleNomeClick}>
              {usuario?.nome?.trim() || "Usuário Desconhecido"}
            </Nome>
          )}
          <Email>{usuario?.email || "email@exemplo.com"}</Email>
        </UserInfo>
      </Card>

      <Card2>
        <Lidos>Livros Lidos</Lidos>
      </Card2>
      <Linha />
    </>
  );
}

/* --- styled-components (depois do componente, fora da função!) --- */

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
  justify-content: center;
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
  align-items: center;
`;

const Nome = styled.h2`
  font-size: 35px;
  margin: 0;
  color: #27387f;
  cursor: pointer;
  text-align: center;
  min-height: 45px; /* garante altura fixa */
  max-width: 250px; /* largura igual ao input */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;


const StyledInput = styled.input`
  font-size: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  text-align: center;
  width: 100%;
  max-width: 250px; /* limita largura */
  min-height: 45px; /* mantém altura fixa como o h2 */
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
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
