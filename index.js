"use strict";

import { tag } from './modules/common.js';
import { blog } from "./modules/blog.js";
import { projects } from "./modules/projects.js";
import { home } from "./modules/home.js";
import { menu } from "./modules/menu.js";
import { books } from "./modules/books.js";
import { games } from "./modules/games.js";
import { links } from "./modules/links.js";
import { sitemap } from "./modules/sitemap.js";
import { intro } from "./modules/intro.js";

function main() {
  tag("header", {},
    tag("nav", {},
        tag("div", {"class":"desktop_menu"},
          tag("a", {"href":"/#home"},
            tag("img",
              {
                "loading":"lazy",
                "src":"/assets/fav.png",
                "style":"margin: 0 auto; border-radius: 5px",
                "width":"80",
                "height":"80",
              }
            )
          )
        ),
        tag("div", {"class":"desktop_menu", "id":"desktop_menu"}),
        tag("div", {"class":"mobile_menu"}, tag("a", {"href":"/#home"}, "Início")),
        tag("div", {"class":"mobile_menu"}, tag("a", {"href":"/#mobile_menu"}, "Menu")),
    )
  )
  tag("main", {"id":"body"});
  // remove o id `body` do primeiro elemento com esse id.
  document.getElementById("body").removeAttribute("id")

  home();
  projects();
  books();
  games();
  blog();
  links();
  menu();
  sitemap();
  intro();
}

main();

