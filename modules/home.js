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

  let i = 0;
  for (const post of posts) {
    if (i === 3) break;
    const id = `${slug(post.date)}_${slug(post.title)}`;
    const id_link = `${slug(post.date)}_entry`;

    create_element("li", `${id}_recent`, "home");
    create_element("a", `${id_link}_recent`, `${id}_recent`);

    set_attribute(`${id_link}_recent`, "href", `#${id}_page`);
    set_attribute(`${id_link}_recent`, "class", "blog_entry");
    add_text(`${id_link}_recent`, `${post.date} - ${post.title}`);
    i++;
  }
}
