"use strict";

import {
  create_page,
  slug,
  tag
} from "./common.js";

import { bookshelf } from "./db/books.js";

export function books() {
  let livros_lidos = 0, livros_sendo_lidos = 0, livros_nao_lidos = 0;
  for (const b of bookshelf) {
    if (Number(b.progress.current) === Number(b.progress.maximum)) livros_lidos++;
    if (Number(b.progress.current) > 0 && Number(b.progress.current) < Number(b.progress.maximum)) livros_sendo_lidos++;
    if (Number(b.progress.current) === 0) livros_nao_lidos++;
  }
  const total_de_livros = bookshelf.length;

  create_page(
    "bookshelf", "Lista de Leitura",
    tag("div", {},
      tag("p", {}, "Essa é a minha coleção de livros e mangás"),
      tag("h3", {}, "Status"),
      tag("table", {"style":"margin-bottom: -3px; border-bottom: 0"},
        tag("tbody", {},
          tag("tr", {},
            tag("th", {}, "Livros lidos"),
            tag("th", {}, "Livros sendo lidos"),
            tag("th", {}, "Livros não lidos")
          ),
          tag("tr", {},
            tag("td", {}, `${livros_lidos}`),
            tag("td", {}, `${livros_sendo_lidos}`),
            tag("td", {}, `${livros_nao_lidos}`)
          ),
        )
      ),
      tag("progress", {"style":"border: solid .1em rgba(var(--ac-0), 1)", "value":`${livros_lidos}`, "max":`${total_de_livros}`}),
      tag("p", {"style":"margin: 0; text-align: center"},
        "Li "                                                                  +
        `<span style='color: rgba(var(--ac-1), 1)'>${livros_lidos}</span> `    +
        "de "                                                                  +
        `<span style='color: rgba(var(--ac-0), 1)'>${total_de_livros}</span> ` +
        "livros da minha coleção."
      ),
      tag("h3", {}, "Coleção"),
      tag("div",
        {
          "id":"shelf",
          "style":"display: flex; flex-wrap: wrap; justify-content: center"
        }
      )
    )
  );

  for (const book of bookshelf) {
    document.getElementById("shelf").appendChild(
      tag("div", {"style":"margin: 10px"},
        tag("img",
          {
            "loading":"lazy",
            "alt":book.title,
            "title":book.title,
            "width":"180",
            "height":"280",
            "style":"object-fit: cover",
            "src":`/assets/${book.cover}`
          }
        ),
        tag("progress", {"value":book.progress.current, "max":book.progress.maximum}),
        tag("p", {"style":"margin: 0; text-align: center"}, `${book.progress.current}/${book.progress.maximum}`)
      )
    );
  }
}

export default books;
