"use strict";

import {
  create_page,
  slug,
  tag
} from "./common.js";

import { bookshelf } from "./db/books.js";

export function books() {
  create_page("bookshelf", "Lista de Leitura", tag("p", {}, "Essa é a minha coleção de livros e mangás"));

  document.getElementById("bookshelf").appendChild(
    tag("div", {"id":"shelf", "style":"display: flex; flex-wrap: wrap; justify-content: center"})
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
