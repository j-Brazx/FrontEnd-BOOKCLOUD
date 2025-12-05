import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FiMenu, FiX } from "react-icons/fi"; 
import { useNavigate } from "react-router-dom";


const HeaderContainer = styled.header`
  display: flex;
  height: 15vh;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  background: linear-gradient(to right, #27387f, #3653c6);
  color: #fff;
  position: relative;
`;

const Titulo = styled.h1`
  font-style: normal;
  font-weight: 750;
  font-size: 27px;
  line-height: 39px;
  color: white;
  margin-right: 10%;
`;


const Nav = styled.nav`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    background: linear-gradient(to right, #27387f, #3653c6);
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 20px;
    display: ${(props) => (props.open ? "flex" : "none")};
  }
`;

const Links = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    font-weight: 700;
  }
`;


const SearchBox = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  padding: 6px 12px;
  border-radius: 5px;
  border: none;
  outline: none;
  width: 220px;
`;


const Perfil = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #ffd500ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #000000ff;
  cursor: pointer;
`;


const Menu = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const role = localStorage.getItem("role"); // <── pega o papel do usuário
  return (
    <HeaderContainer>

      <Titulo>BOOKCLOUD</Titulo>

      <Menu onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
      </Menu>

      <Nav open={menuOpen}>
        <Links to="/inicio" onClick={() => setMenuOpen(false)}>
          Início
        </Links>
        <Links to="/categorias" onClick={() => setMenuOpen(false)}>
          Categorias
        </Links>
        <Links to="/acervo" onClick={() => setMenuOpen(false)}>
          Acervo
        </Links>
       
        {role === "bibliotecário" && (
          <>
            <Links to="/painel" onClick={() => setMenuOpen(false)}>
              Painel
            </Links>
            <Links to="/clientes" onClick={() => setMenuOpen(false)}>
              Clientes
            </Links>
          </>
        )}
      </Nav>

      <Perfil onClick={() => navigate("/perfil")}>P</Perfil>
    </HeaderContainer>
  );
}

