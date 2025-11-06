import React, { useState } from "react";

export default function ExcluirLivroModal({ onClose, onDelete }) {
  const [nome, setNome] = useState("");

  const handleDelete = () => {
    if (nome.trim() === "") {
      alert("Por favor, insira o nome do livro!");
      return;
    }
    onDelete(nome);
    setNome("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6 relative">
     
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#1d2b6f] font-bold text-lg"
        >
          ✕
        </button>

      
        <h2 className="text-xl font-semibold text-center mb-6">Excluir livro</h2>

       
        <label className="block text-gray-800 font-medium mb-1">Nome</label>
        <input
          type="text"
          placeholder="Insira o nome da categoria"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full bg-gray-200 rounded-md p-2 mb-6 placeholder-gray-500 outline-none"
        />

    
        <button
          onClick={handleDelete}
          className="w-full bg-[#1d2b6f] text-white font-semibold py-2 rounded-md hover:bg-[#24368c] transition"
        >
          Excluir
        </button>
      </div>
    </div>
  );
}