import React, { useState, useEffect } from "react";
import styled from "styled-components";

const selecionarCategorias = async () => {
  try {
    const resposta = await fetch(
      `http://localhost:3000/categorias/selecionarLivro`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carregar),
      }
    );
    if (!resposta.ok) {
      const errorData = await resposta.json().catch(() => ({
        message: "Erro ao mostrar categorias.",
      }));
      throw new Error(
        errorData.message || "Erro desconhecido ao atualizar movimentação."
      );
    }
    return await resposta.json();
  } catch (erro) {
    console.error("Erro ao carregar categorias:", erro);
    throw erro;
  }
};
