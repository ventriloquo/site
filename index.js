"use strict";

import { create_root, tag } from './modules/common.js';
import { blog } from "./modules/blog.js";
import { projects } from "./modules/projects.js";
import { home } from "./modules/home.js";
import { menu } from "./modules/menu.js";
import { books } from "./modules/books.js";
import { games } from "./modules/games.js";
import { links } from "./modules/links.js";
import { sitemap } from "./modules/sitemap.js";

function main() {
  // Essa definitivamente é uma das maiores gambiarras que eu já fiz nesse
  // site.
  create_root("body");
  tag("header", {},
    tag("nav", {},
      tag("div", {}, tag("a", {"href":"/#home"}, "Início")),
      tag("div", {"id":"desktop_menu"}),
      tag("div", {"class":"mobile_menu"}, tag("a", {"href":"/#mobile_menu"}, "Menu")),
    ))
  tag("main", {"id":"body"});
  document.getElementById("body").setAttribute("id", "")

  home();
  projects();
  books();
  games();
  blog();
  links();
  menu();
  sitemap();
}

main();
