"use strict";

import { create_priv_page } from "../index.js"

export function home() {
  create_priv_page(
    "home",
    "Caderno do Tukain",
`<p>
Aqui é um lugar onde eu gosto de compartilhar um pouco do meu cotidiano.
Também é um lugar onde eu ponho em prática algumas coisas que eu aprendi,
seja elas relacionadas à tecnologia, programação ou qualquer outro assunto
que eu achar pertinente.
</p>

<blockquote>
  <p>"The strength of JavaScript is that you can do anything. The weakness is that you will." - Reg Braithwaite</p>
</blockquote>
`)
}
