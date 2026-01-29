"use strict";

import {
  create_page,
  slug,
  tag
} from "./common.js";

import { game_colection } from "./db/games.js";

export function games() {
  create_page("jogos", "Jogos", tag("p", {}, "Minha coleção de jogos"));

  document.getElementById("jogos").appendChild(
    tag("div", {
      "id":"game_library",
      "style":"display: flex; flex-wrap: wrap; justify-content: center"})
  );

  for (const game of game_colection) {
    document.getElementById("game_library").appendChild(
      tag("div", {"style":"margin: 5px"},
        tag("img", {
          "loading":"lazy",
          "style":"margin: 0; width: 180px; height: 180px",
          "alt":slug(game.title),
          "title":game.title,
          "src":`/assets/${game.cover}`
        }))
    );
  }
}

export default games;
