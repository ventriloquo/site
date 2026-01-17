"use strict";

import {
  slug,
  create_element,
  set_attribute,
  create_page,
  add_text,
  add_html
} from "../index.js";

import { projects } from "./db/projects.js";

export function project_list() {
  create_page("projetos", "Projetos");
  create_element("p", "projetos_description", "projetos");
  add_text("projetos_description", "Esses são alguns dos projetos em que eu já trabalhei/estou desenvolvendo.");

  for (let project of projects) {
    create_element("hr", "ruler", "projetos");

    const cover = `${slug(project.title)}_cover`;
    const title = `${slug(project.title)}_title`;
    const content = `${slug(project.title)}_content`;

    create_element("img", cover, "projetos");
    set_attribute(cover, "loading", "lazy");
    set_attribute(cover, "style", "max-width: 200px; max-height: 300px");
    set_attribute(cover, "src", `${project.icon}`);

    create_element("h2", title, "projetos");
    create_element("a", `${title}_link`, title);
    set_attribute(`${title}_link`, "href", `${project.repo}`);
    add_text(`${title}_link`, `${project.title}`);

    create_element("p", content, "projetos");
    add_html(content, `${project.description.replaceAll("\n", "<br>")}`);

  }

}

export default project_list;
