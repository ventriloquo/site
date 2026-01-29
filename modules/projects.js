"use strict";

import {
  slug,
  set_attribute,
  create_page,
  tag
} from "./common.js";

import { projects as project_list } from "./db/projects.js";

export function projects() {
  create_page("projetos", "Projetos",
    tag("div", {}, tag("p", {}, "Esses são alguns dos projetos em que eu já trabalhei/estou desenvolvendo.")));

  for (const project of project_list) {
    const cover = `${slug(project.title)}_cover`;
    const title = `${slug(project.title)}_title`;
    const content = `${slug(project.title)}_content`;

    document.getElementById("projetos").appendChild(tag("div", {},
      tag("hr"),
      tag("img", {"title":cover, "loading":"lazy", "style":"max-width: 200px; max-height: 300px", "src":project.icon}),
      tag("h2", {}, tag("a", {"href":project.repo, "target":"_blank"}, project.title)),
      tag("p", {}, project.description.replaceAll("\n", "<br>"))
    ))
  }
}

export default projects;
