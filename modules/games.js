"use strict";

import {
  create_page,
  create_element,
  add_text,
  add_html,
  set_attribute,
  slug
} from "../index.js"

import { game_colection } from "./db/games.js";

export function games() {
  create_page("jogos", "Jogos");
  create_element("p", "jogos_description", "jogos")
  add_text("jogos_description", "Minha coleção de jogos")

  create_element("div", "game_library", "jogos")
  set_attribute("game_library", "style", "display: flex; flex-wrap: wrap")
  for (let game of game_colection) {
    create_element("div", `${slug(game.title)}_container`, "game_library")
    set_attribute(`${slug(game.title)}_container`, "style", "margin: 5px")

    create_element("img", `${slug(game.title)}_cover`, `${slug(game.title)}_container`)
    set_attribute(`${slug(game.title)}_cover`, "loading", "lazy")
    set_attribute(`${slug(game.title)}_cover`, "style", "margin: 0; width: 180px; height: 180px")
    set_attribute(`${slug(game.title)}_cover`, "src", `/assets/${game.cover}`)
    set_attribute(`${slug(game.title)}_cover`, "alt", `${slug(game.title)}`)
    set_attribute(`${slug(game.title)}_cover`, "title", `${game.title}`)
  }
}

export default games;
