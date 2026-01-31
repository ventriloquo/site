"use strict";

import {
  create_page,
  slug,
  tag
} from "./common.js";

import { bookshelf } from "./db/books.js";

export function books() {
  let r = 0, s = 0, n = 0;
  for (const b of bookshelf) {
    if (b.progress.current === b.progress.maximum) r++;
    if (Number(b.progress.current) > 0 && Number(b.progress.current) < Number(b.progress.maximum)) s++;
    if (Number(b.progress.current) === 0) n++;
  }
  const t = bookshelf.length;

  create_page(
    "bookshelf", "Lista de Leitura",
    tag("div", {},
      tag("p", {}, "Essa é a minha coleção de livros e mangás"),
      tag("h3", {}, "Status"),
      tag("table", {},
        tag("tbody", {},
          tag("tr", {},
            tag("th", {}, "Livros lidos"), tag("th", {}, "Livros sendo lidos"), tag("th", {}, "Livros não lidos")
          ),
          tag("tr", {},
            tag("td", {}, `${r}`), tag("td", {}, `${s}`), tag("td", {}, `${n}`)
          ),
        )),
      tag("progress", {"value":`${r}`, "max":`${t}`}),
      tag("p", {"style":"margin: 0; text-align: center"}, `Li <span style='color: rgba(var(--ac-1), 1)'>${r}</span> de <span style='color: rgba(var(--ac-0), 1)'>${t}</span> livros da minha coleção.`),
      tag("h3", {}, "Coleção"),
      tag("div", {"id":"shelf", "style":"display: flex; flex-wrap: wrap; justify-content: center"})
    )
  );

  for (const book of bookshelf) {
    document.getElementById("shelf").appendChild(
      tag("div", {"style":"margin: 10px"},
        tag("img", {
          "loading":"lazy",
          "alt":book.title,
          "style":"width: 180px; height: 280px",
          "src":`/assets/${book.cover}`
        }),
      tag("progress", {"value":book.progress.current, "max":book.progress.maximum}),
      tag("p", {"style":"margin: 0; text-align: center"}, `${book.progress.current}/${book.progress.maximum}`)
      )
    );
  }
}

export default books;
