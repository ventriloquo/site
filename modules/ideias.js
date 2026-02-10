"use strict";

import {
  create_page,
  markup,
  tag,
} from "./common.js";

import { ideias as ideia } from "./db/ideias.js"

export function ideias() {
  create_page("ideias", "Ideias",
    tag("div", {"id":"whiteboard"}, tag("h2", {"style":"margin-bottom: 1em"}, "Ideias para o meu site"))
  )

  for (const i of ideia) {
    switch (i.stat) {
      case 1: i.stat  = "<span style='align-content: center; margin-left: .5em; padding: 0 .5em; border-radius: 5px; color: var(--bg-1); background-color: var(--yellow)'>Parcialmente feito<span>"; break;
      case 2: i.stat  = "<span style='align-content: center; margin-left: .5em; padding: 0 .5em; border-radius: 5px; color: var(--bg-1); background-color: var(--green)'>Feito</span>"; break;
      default: i.stat = "<span style='align-content: center; margin-left: .5em; padding: 0 .5em; border-radius: 5px; color: var(--bg-1); background-color: var(--red)'>Não feito</span>"; break;
    }
    document.getElementById("whiteboard").appendChild(
      tag("details", {
        "style":`
           padding: .3em;
           user-select: none;
           background-color: var(--bg-0);
           width: 100%;
           cursor: pointer;
           border-radius: 5px;
           margin: 1em 0;
        `
        },
        tag("summary", {
          "style":`
            font-size: x-large;
            display: flex;
            justify-content: space-between;
          `
        }, `<span style="max-width: 20ch">${i.title}</span>${i.stat}`),
        tag("p", {"style":"padding-top: .5em; margin-top: .5em; border-top: solid .1em var(--fg)"}, markup(i.content))
      )
    )
  }

}
export default ideias;
