"use strict";

import {
  create_page,
  create_element,
  add_text,
  set_attribute,
  slug
} from "./common.js";

import { bookshelf } from "./db/books.js";

export function books() {
  create_page("bookshelf", "Lista de Leitura");

  create_element("p", "books_description", "bookshelf");
  add_text("books_description", "Essa é a minha coleção de livros e mangás");

  create_element("div", "shelf", "bookshelf");
  set_attribute("shelf", "style", "display: flex; flex-wrap: wrap; justify-content: center");
  for (const book of bookshelf) {
    create_element("div", `${slug(book.title)}_container`, "shelf");
    set_attribute(`${slug(book.title)}_container`, "style", "margin: 10px");

    create_element("img", `${slug(book.title)}_cover`, `${slug(book.title)}_container`);
    set_attribute(`${slug(book.title)}_cover`, "loading", "lazy");
    set_attribute(`${slug(book.title)}_cover`, "style", "width: 180px; height: 280px");
    set_attribute(`${slug(book.title)}_cover`, "src", `/assets/${book.cover}`);
    set_attribute(`${slug(book.title)}_cover`, "alt", `${book.title}`);

    create_element("progress", `${slug(book.title)}_progress`, `${slug(book.title)}_container`);
    set_attribute(`${slug(book.title)}_progress`, "value", `${book.progress.current}`);
    set_attribute(`${slug(book.title)}_progress`, "max", `${book.progress.maximum}`);

    create_element("p", `${slug(book.title)}_progress_text`, `${slug(book.title)}_container`);
    add_text(`${slug(book.title)}_progress_text`, `${book.progress.current}/${book.progress.maximum}`);
    set_attribute(`${slug(book.title)}_progress_text`, "style", "margin: 0");
  }
}

export default books;
