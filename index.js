"use strict";

import { list_entries, create_post } from "./modules/blog.js";
import { project_list } from "./modules/projects.js";
import { home } from "./modules/home.js";
import { menu } from "./modules/menu.js";

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
  return document.getElementById(element).innerText = text;
}

export function add_html(element, HTML) {
  return document.getElementById(element).innerHTML = HTML;
}

export function create_page(name, title, content) {
  if (title === undefined) {
    const title = name;
  }

  create_element("section", name, "body");
  create_element("h1", `${name}_title`, name);
  add_text(`${name}_title`, title);

  if (content) {
    create_element("p", `${name}_content`, `${name}`);
    add_html(`${name}_content`, content);
  };

  page_list.push(
    {
      id: `#${name}`,
      title: `${title}`
    }
  );
}

export function create_priv_page(name, title, content) {
  if (title === undefined) {
    const title = name;
  }

  create_element("section", name, "body");
  create_element("h1", `${name}_title`, name);
  add_text(`${name}_title`, title);

  if (content) {
    create_element("p", `${name}_content`, `${name}`);
    add_html(`${name}_content`, content);
  };
}

function blog() {
  list_entries();
  create_post();
}

function main() {
  home();
  project_list();
  blog();
  menu();
}

main();
