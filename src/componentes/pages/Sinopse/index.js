import React from "react";
import styled from "styled-components";
import Livro from '../../Malim/nadandonoescuri.jpg'

export default function Sinopse() {
  return (
    <>
      <div className="bg-gray-100 min-h-screen flex flex-col">
        <main className="flex justify-center items-center flex-1 p-6">
          <div className="max-w-4xl w-full p-6 shadow-lg rounded-2xl bg-white">
            <p className="text-gray-500 text-sm mb-4">
              Acervo &gt; Romance &gt;{" "}
              <span className="font-semibold">Nadando no escuro</span>
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div classNameo="flex flex-col items-center">
                <img src={Livro} alt="Livro" /> 
                <div className="mt-3 flex gap-1">
                  <span className="text-blue-500 text-xl">★</span>
                  <span className="text-blue-500 text-xl">★</span>
                  <span className="text-blue-500 text-xl">★</span>
                  <span className="text-gray-300 text-xl">★</span>
                </div>
              </div>

              <Texto>
                <h2 className="text-2xl font-bold mb-4">SINOPSE</h2>
                <h2 className="text-gray-700 leading-relaxed mb-4">
                  Um romance delicado e intenso sobre amor proibido na Polônia
                  comunista.
                </h2>

                <Disponível className="text-red-600 font-semibold mb-4">
                  DISPONÍVEL EM: 14/07/2025
                </Disponível>

                <Botao className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-2xl shadow">
                  Reservar
                </Botao>
              </Texto>
            </div>

            <Comu className="flex justify-center mt-6">
              <button className="bg-gray-300 text-blue-900 font-semibold px-6 py-2 rounded-2xl shadow hover:bg-gray-400">
                Comunidade
              </button>
            </Comu>
          </div>
        </main>
      </div>
    </>
  );
}

const Texto = styled.div`
  justify-self: center;
  margin-bottom: 30px;
`;

const Comu = styled.div`
  background-color: gray;
`;


const Disponível = styled.p`
  color: red;
  font-weight: bold;
  font-size: 25px;
`;
const Botao = styled.button`
  padding: 14px;
  background: #27387f;
  color: white;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: background 0.3s;

  &:hover {
    background: #1d2b5c;
  }
`;
