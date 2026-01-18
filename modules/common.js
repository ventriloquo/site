"use strict";

export const page_list = [];

export function slug(text) {
  return text.toLowerCase()
             .replaceAll(" ", "_")
             .replaceAll(",", "")
             .replaceAll(".", "")
             .replaceAll(">", "")
             .replaceAll("<", "")
             .replaceAll("-", "")
             .replaceAll("+", "")
             .replaceAll(":", "")
             .replaceAll(";", "")
             .replaceAll("?", "")
             .replaceAll("!", "")
             .replaceAll("/", "")
             .replaceAll("%", "")
             .replaceAll("#", "")
             .replaceAll("*", "")
             .replaceAll("&", "")
             .replaceAll("__", "_")
             .replaceAll("___", "_")
             .replaceAll("á", "a")
             .replaceAll("à", "a")
             .replaceAll("â", "a")
             .replaceAll("ã", "a")
             .replaceAll("é", "e")
             .replaceAll("è", "e")
             .replaceAll("ê", "e")
             .replaceAll("ó", "o")
             .replaceAll("ò", "o")
             .replaceAll("ô", "o")
             .replaceAll("õ", "o")
             .replaceAll("ç", "c");
}

export function create_element(name, id, appendTo) {
  const element = document.createElement(name);
  element.setAttribute("id", id);

  document.getElementById(appendTo).appendChild(element);
}

export function set_attribute(id, name, value) {
  document.getElementById(id).setAttribute(name, value);
}

export function add_text(element, text) {
  document.getElementById(element).innerText = text;
}

export function add_html(element, HTML) {
  document.getElementById(element).innerHTML = HTML;
}

export function create_page(name, title, content) {
  const id = slug(name);

  create_element("section", id, "body");
  create_element("h1", `${id}_title`, id);
  add_text(`${id}_title`, title);

  if (content) {
    create_element("p", `${id}_content`, `${id}`);
    add_html(`${id}_content`, content);
  }

  page_list.push(
    {
      id: `#${id}`,
      title: `${title}`
    }
  );
}

export function create_priv_page(name, title, content) {
  const id = slug(name);

  create_element("section", id, "body");
  create_element("h1", `${id}_title`, id);
  add_text(`${id}_title`, title);

  if (content) {
    create_element("p", `${id}_content`, `${id}`);
    add_html(`${id}_content`, content);
  }
}
