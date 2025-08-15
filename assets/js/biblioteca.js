"use strict";

import colection from "./db/collection.js";

const biblioteca = document.getElementById("biblioteca");

for (let i = 0; i < colection.length; i++) {
  const entrada = document.createElement("div");
  const capa = document.createElement("img");
  const titulo = document.createElement("p");
  const progresso = document.createElement("progress");

  entrada.setAttribute("class", "livro");
  entrada.setAttribute("id", `livro_${i}`);

  capa.setAttribute("loading", "lazy");
  capa.setAttribute("src", `/assets/img/books/${colection[i].cover}`);

  const maximum = colection[i].progress.maximum;
  const current = colection[i].progress.current;

  progresso.setAttribute("value", `${current}`);
  progresso.setAttribute("max", `${maximum}`);
  progresso.setAttribute("title", `${current} páginas lidas`);

  titulo.innerHTML = `<a href="${colection[i].url}" target="_blank">${colection[i].title}</a>`;

  biblioteca.appendChild(entrada);
  document.getElementById(`livro_${i}`).appendChild(capa);
  document.getElementById(`livro_${i}`).appendChild(progresso);
  document.getElementById(`livro_${i}`).appendChild(titulo);
}
