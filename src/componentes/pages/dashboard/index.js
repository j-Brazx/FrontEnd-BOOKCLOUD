import React from "react";
import styled from "styled-components";

const Container = styled.div`
  font-family: "Arial", sans-serif;
  background: #f4f4f4;
  min-height: 100vh;
  padding-top: 40px;
`;

// Caixa principal do painel
const DashboardBox = styled.div`
  background: white;
  border: 2px solid #d0d0ff;
  border-radius: 10px;
  margin: 0 auto;
  padding: 20px 40px;
  width: 90%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const DateBox = styled.div`
  align-self: flex-end;
  background: #2c4aa8;
  color: white;
  padding: 5px 15px;
  border-radius: 15px;
  font-weight: bold;
  font-size: 0.9rem;
`;

// Container com os cards lado a lado
const StatsRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: nowrap;
  gap: 20px;
  margin-top: 20px;
  flex: 1;
`;

const StatCard = styled.div`
  background: ${(props) => props.bg || "#ccc"};
  color: white;
  text-align: center;
  padding: 20px 30px;
  border-radius: 10px;
  min-width: 180px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    margin: 0;
  }

  h2 {
    margin: 5px 0 0 0;
  }
`;

const CircleCard = styled.div`
  background: #4b578e;
  color: white;
  border-radius: 50%;
  width: 110px;
  height: 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  text-align: center;

  p {
    font-size: 0.9rem;
    margin: 0;
  }

  h2 {
    margin: 3px 0 0 0;
  }
`;

const GenreBox = styled.div`
  background: #1f3b8c;
  color: white;
  text-align: center;
  margin: 25px auto 10px auto;
  padding: 15px 40px;
  border-radius: 10px;
  font-size: 1.2rem;
  font-weight: bold;
  max-width: 400px;
`;

export default function Painel() {
  return (
    <Container>
      <DashboardBox>
        <DateBox>05/05/2025</DateBox>

        <StatsRow>
          <StatCard bg="#2b6ea6">
            <p>Livros no estoque</p>
            <h2>1500</h2>
          </StatCard>

          <StatCard bg="#4a238b">
            <p>Livros emprestados</p>
            <h2>20</h2>
          </StatCard>

          <StatCard bg="#1b7b83">
            <p>Atrasos</p>
            <h2>05</h2>
          </StatCard>

          <StatCard bg="#671d88">
            <p>Novos usuários</p>
            <h2>14</h2>
          </StatCard>

          <CircleCard>
            <p>Novos livros</p>
            <h2>20</h2>
          </CircleCard>
        </StatsRow>

        <GenreBox>
          Gênero de maior empréstimo
          <br />
          <span style={{ fontSize: "1.8rem" }}>SUSPENSE</span>
        </GenreBox>
      </DashboardBox>
    </Container>
  );
}
