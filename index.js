"use strict";

import {
  list_entries,
  create_post
} from "./modules/blog.js";

import { project_list } from "./modules/projects.js";
import { home } from "./modules/home.js";
import { menu } from "./modules/menu.js";
import { books } from "./modules/books.js";
import { games } from "./modules/games.js";

function blog() {
  list_entries();
  create_post();
}

function main() {
  home();
  project_list();
  books();
  games();
  blog();
  menu();
}

main();
