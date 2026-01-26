"use strict";

import {
  list_entries,
  create_post
} from "./modules/blog.js";

import { projects } from "./modules/projects.js";
import { home } from "./modules/home.js";
import { menu } from "./modules/menu.js";
import { books } from "./modules/books.js";
import { games } from "./modules/games.js";
import { links } from "./modules/links.js";

function blog() {
  list_entries();
  create_post();
}

function main() {
  home();
  projects();
  books();
  games();
  blog();
  links();
  menu();
}

main();
