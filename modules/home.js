"use strict";

import {
  create_priv_page,
  create_element,
  set_attribute,
  add_text,
  slug,
  markup,
} from "./common.js";

import { posts } from "./db/posts.js";
import { list_entries } from "./blog.js";

export function home() {
  create_priv_page(
    "home",
    "Caderno do Tukain",
    markup(`Aqui é um lugar onde eu gosto de compartilhar um pouco do meu cotidiano. Também é um lugar onde eu ponho em prática algumas coisas que eu aprendi, seja elas relacionadas à tecnologia, programação ou qualquer outro assunto que eu achar pertinente.
#+begin_quote
<span>Reg Braithwaite</span>
"The strength of JavaScript is that you can do anything. The weakness is that you will."
#+end_quote

* Últimos posts
`));

  list_entries("home", 3, "recent");

}
